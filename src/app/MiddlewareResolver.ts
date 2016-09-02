import * as winston from "winston";
import * as express from "express";
import * as swaggerMiddleware from "swagger-express-middleware";
import * as Contracts from "../framework/communication/Contracts";

let expressWinston = require("express-winston");

export class MiddlewareResolver {

    protected router:express.Router = null;
    protected winstonTransports:[winston.TransportInstance] = null;
    protected zipkinMiddleware = null;

    constructor (router:express.Router, winstonTransports:[winston.TransportInstance], zipkinMiddleware) {
        this.router = router;
        this.winstonTransports = winstonTransports;
        this.zipkinMiddleware = zipkinMiddleware;
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
                // self.zipkinMiddleware,
                self.router
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
            transports: self.winstonTransports
        });
    }

    protected getErrorLogger () {
        let self = this;

        return expressWinston.errorLogger({
            transports: self.winstonTransports
        });
    }
}