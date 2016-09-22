import * as Knex from "knex";
import * as Winston from "winston"

import {knexConfig} from "./configuration/knex";
import {winstonTranstports} from "./configuration/winston";
import {zipkinRecorder} from "./configuration/zipkin";
import {serviceConfig} from "./configuration/service";
import {AResolver} from "../../framework/AResolver";

let yaml = require('yamljs');

export class ConfigurationResolver extends AResolver {

    getKnexConfig():Knex.Config {
        return knexConfig;
    }

    getServiceConfig() {
        return serviceConfig;
    }

    getWinstonTransports():[Winston.TransportInstance] {
        return winstonTranstports;
    }

    getZipkinRecorder() {
        return zipkinRecorder;
    }

    getEntitySchema(name: string) {
        return yaml.load('swagger-definitions.yml')[name];
    }

}