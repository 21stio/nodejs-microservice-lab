function getServicePort():number {
    if (process.env.SERVICE_PORT == undefined) {
        throw Error('process.env.SERVICE_PORT is not set!');
    }

    return parseInt(process.env.SERVICE_PORT);
}

function getServicename():string {
    if (process.env.SERVICE_NAME == undefined) {
        throw Error('process.env.SERVICE_NAME is not set!');
    }

    return process.env.SERVICE_NAME;
}

export var serviceConfig = {
    port: getServicePort(),
    name: getServicename()
};