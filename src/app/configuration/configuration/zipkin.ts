const {BatchRecorder, ConsoleRecorder} = require('zipkin');
const {HttpLogger} = require('zipkin-transport-http');

function getZipkinRecorder():string {
    if (process.env.ZIPKIN_RECODER == undefined) {
        throw Error('process.env.ZIPKIN_RECODER is not set!')
    }

    return process.env.ZIPKIN_RECODER;
}

function getHttpLoggerEndpoint():string {
    if (process.env.HTTP_LOGGER_ENDPOINT == undefined) {
        throw Error('process.env.HTTP_LOGGER_ENDPOINT is not set!');
    }

    return process.env.HTTP_LOGGER_ENDPOINT;
}

function getRecorder():any {
    switch(getZipkinRecorder()) {
        case 'console':
            return new ConsoleRecorder();
        case 'http':
            return new BatchRecorder({
                logger: new HttpLogger({
                    endpoint: getHttpLoggerEndpoint()
                })
            });
        case 'mute':
            return new ConsoleRecorder(function(){});
        default:
            throw Error('')
    }
}

export var zipkinRecorder = getRecorder();