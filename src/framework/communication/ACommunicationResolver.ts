import * as express from "express"
import {IRouter} from "./IRouter";
import * as Promise from "bluebird";
import  * as Contracts from "./Contracts";
import {DependencyResolver} from "../../app/DependencyResolver";
import {AResolver} from "../AResolver";

function attach(handler:(request: express.Request) => Promise<any>) {
    return function (request:express.Request, response:express.Response, next) {
        handler(request).then(function (data) {
            let resultResponse:Contracts.IDataResponse = {
                success: true,
                data: data
            };

            if(data === true) {
                delete resultResponse['data'];
            }

            response.send(resultResponse);
        }).catch(next);
    }
}

export abstract class ACommunicationResolver extends AResolver {

    protected abstract getRouters():[IRouter];

    constructor (protected dependencyResolver: DependencyResolver) {
        super();
    }

    getRouter(basePath: string): express.Router {
        var self = this;

        var expressRouter = express.Router();

        for (let router of self.getRouters()) {
            for (let route of router.getRoutes()) {
                let path = basePath + router.getPath() + route.path;
                switch (route.method) {
                    case "get":
                        expressRouter.get(path, attach(route.handler));
                        break;
                    case "post":
                        expressRouter.post(path, attach(route.handler));
                        break;
                    case "put":
                        expressRouter.put(path, attach(route.handler));
                        break;
                    case "delete":
                        expressRouter.delete(path, attach(route.handler));
                        break;
                }
            }
        }

        return expressRouter;
    }
}