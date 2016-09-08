import * as express from "express"
import {IRouter} from "./IRouter";
import * as Promise from "bluebird";
import {PersistenceResolver} from "../../app/persistence/PersistenceResolver";
import {BusinessResolver} from "../../app/business/BusinessResolver";
import  * as Contracts from "./Contracts";

function attach(handler:(id:number, params:any) => Promise<any>) {
    return function (request:express.Request, response:express.Response, next) {
        handler(request.params.id, request.body).then(function (data) {
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

export abstract class ACommunicationResolver {

    protected abstract getRouters():[IRouter];

    protected persistenceResolver:PersistenceResolver = null;
    protected businessResolver:BusinessResolver = null;

    constructor(persistenceResolver:PersistenceResolver, businessResolver:BusinessResolver) {
        this.persistenceResolver = persistenceResolver;
        this.businessResolver = businessResolver;
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