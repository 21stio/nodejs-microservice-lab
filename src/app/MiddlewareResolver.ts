import * as express from "express";
import * as swaggerMiddleware from "swagger-express-middleware";
import * as Contracts from "../framework/communication/Contracts";
import {DependencyResolver} from "./DependencyResolver";
import {AResolver} from "../framework/AResolver";

let expressWinston = require("express-winston");

export class MiddlewareResolver extends AResolver {

    constructor (protected dependencyResolver: DependencyResolver) {
        super();
    }

    attachMiddleware (application:express.Application) {
        let self = this;

        swaggerMiddleware("swagger.yml", application, function (err, middleware) {
            application.use(
                middleware.metadata(),
                middleware.CORS(),
                middleware.files(),
                middleware.parseRequest(),
                middleware.validateRequest()
            );

            application.use(
                self.getRequestLogger(),
                // self.dependencyResolver.getPackageResolver().getZipkinMiddleware()
                self.dependencyResolver.getCommunicationResolver().getRouter("/v1")
            );

            application.use(
                self.getErrorLogger(),
                function (error:Error, request:express.Request, response:express.Response, next:() => void) {
                    let feedback:Contracts.IMessageResponse = {
                        success: false,
                        message: error.message
                    };

                    response.send(feedback);
                }
            );
        });
    }

    protected getRequestLogger () {
        let self = this;

        expressWinston.requestWhitelist.push("body");

        return expressWinston.logger({
            transports: self.dependencyResolver.getConfigurationResolver().getWinstonTransports()
        });
    }

    protected getErrorLogger () {
        let self = this;

        return expressWinston.errorLogger({
            transports: self.dependencyResolver.getConfigurationResolver().getWinstonTransports()
        });
    }
}