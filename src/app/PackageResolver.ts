import * as winston from "winston";
const {Tracer} = require("zipkin");
import {AResolver} from "../framework/AResolver";
import {DependencyResolver} from "./DependencyResolver";
const CLSContext = require("zipkin-context-cls");
const zipkinMiddleware = require("zipkin-instrumentation-express").expressMiddleware;

export class PackageResolver extends AResolver {

    constructor (protected dependencyResolver: DependencyResolver) {
        super();
    }

    getLogger ():winston.LoggerInstance {
        let self = this;

        return self.cache("winston", function () {
            return new (winston.Logger)({
                transports: self.dependencyResolver.getConfigurationResolver().getWinstonTransports()
            });
        });
    }

    getTracer () {
        let self = this;

        return self.cache("Tracer", function () {
            return new Tracer({
                recorder: self.dependencyResolver.getConfigurationResolver().getZipkinRecorder(),
                ctxImpl: new CLSContext("zipkin")
            });
        });
    }

    getZipkinMiddleware () {
        let self = this;

        return self.cache("ZipkinMiddleware", function () {
            return zipkinMiddleware(
                self.getTracer(),
                self.dependencyResolver.getConfigurationResolver().getServiceConfig().name,
                self.dependencyResolver.getConfigurationResolver().getServiceConfig().port
            );
        });
    }
}