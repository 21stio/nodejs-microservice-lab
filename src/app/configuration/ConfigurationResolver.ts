import * as Knex from "knex";
import * as winston from "winston"

import {knexConfig} from "./configuration/knex";
import {winstonTranstports} from "./configuration/winston";
import {zipkinRecorder} from "./configuration/zipkin";
import {serviceConfig} from "./configuration/service";

export class ConfigurationResolver {

    getKnexConfig():Knex.Config {
        return knexConfig;
    }

    getServiceConfig() {
        return serviceConfig;
    }

    getWinstonTransports():[winston.TransportInstance] {
        return winstonTranstports;
    }

    getZipkinRecorder() {
        return zipkinRecorder;
    }

}