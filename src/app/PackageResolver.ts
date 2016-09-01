import * as winston from "winston";
const {Tracer} = require("zipkin");
import {ConfigurationResolver} from "./configuration/ConfigurationResolver";
const CLSContext = require("zipkin-context-cls");
const zipkinMiddleware = require("zipkin-instrumentation-express").expressMiddleware;

export class PackageResolver {

    protected configurationResolver:ConfigurationResolver = null;
    protected logger:winston.LoggerInstance = null;
    protected zipkinTracer = null;
    protected zipkinMiddleware = null;

    constructor (configurationResolver:ConfigurationResolver) {
        this.configurationResolver = configurationResolver;
    }

    getLogger ():winston.LoggerInstance {
        let self = this;

        if (self.logger == null) {
            self.logger = new (winston.Logger)({
                transports: self.configurationResolver.getWinstonTransports()
            });
        }

        return self.logger;
    }

    getTracer () {
        let self = this;

        if (self.zipkinTracer == null) {
            self.zipkinTracer = new Tracer({
                recorder: self.configurationResolver.getZipkinRecorder(),
                ctxImpl: new CLSContext("zipkin")
            });
        }

        return self.zipkinTracer;
    }

    getZipkinMiddleware () {
        let self = this;

        if (self.zipkinMiddleware == null) {
            self.zipkinMiddleware = zipkinMiddleware(
                self.getTracer(),
                self.configurationResolver.getServiceConfig().name,
                self.configurationResolver.getServiceConfig().port
            );
        }

        return self.zipkinMiddleware;
    }
}