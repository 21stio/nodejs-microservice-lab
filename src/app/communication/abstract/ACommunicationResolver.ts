import * as Promise from "bluebird"
import * as express from "express"
import {IRouter} from "./IRouter";
import {PersistenceResolver} from "../../persistence/PersistenceResolver";

function attach(handler:(id:number, params:any) => Promise<any>) {
    return function (request:express.Request, response:express.Response, next) {
        handler(request.params.id, request.body).then(function (data) {
            response.send(data)
        });
    }
}

export abstract class ACommunicationResolver {

    protected abstract getRouters():[IRouter];

    protected persistenceResolver:PersistenceResolver = null;

    constructor(persistenceResolver:PersistenceResolver) {
        this.persistenceResolver = persistenceResolver;
    }

    attachRouters(basePath: string, application:express.Application) {
        var self = this;

        for (let router of self.getRouters()) {
            for (let route of router.getRoutes()) {
                switch (route.method) {
                    case "get":
                        application.get(basePath + route.path, attach(route.handler));
                        break;
                    case "post":
                        application.post(basePath + route.path, attach(route.handler));
                        break;
                    case "put":
                        application.put(basePath + route.path, attach(route.handler));
                        break;
                    case "delete":
                        application.delete(basePath + route.path, attach(route.handler));
                        break;
                }
            }
        }
    }
}