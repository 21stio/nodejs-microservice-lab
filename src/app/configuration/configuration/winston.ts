import * as winston from "winston"



function getStringifyLogs():boolean {
    if (process.env.STRINGIFY_LOGS == undefined) {
        throw Error('process.env.STRINGIFY_LOGS is not set!');
    }

    return JSON.parse(process.env.STRINGIFY_LOGS);
}

function getLogLevel():string {
    if (process.env.LOG_LEVEL == undefined) {
        throw Error('process.env.LOG_LEVEL is not set!');
    }

    return process.env.LOG_LEVEL;
}

export var winstonTranstports:[winston.TransportInstance] = [
    new winston.transports.Console({
        level: getLogLevel(),
        json: true,
        stringify: getStringifyLogs(),
        timestamp: true
    })
];