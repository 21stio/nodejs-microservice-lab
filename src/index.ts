import * as express from "express";

var fetch = require('node-fetch');
const {trace, BatchRecorder, Tracer, ExplicitContext, ConsoleRecorder} = require('zipkin');
const zipkinMiddleware = require('zipkin-instrumentation-express').expressMiddleware;
const {HttpLogger} = require('zipkin-transport-http');
const CLSContext = require('zipkin-context-cls');

var ctxImpl = new ExplicitContext();
var recorder = new ConsoleRecorder();

const tracer = new Tracer({
    recorder: recorder,
    ctxImpl: new CLSContext('zipkin')
});


//CALLER
const wrapFetch = require('zipkin-instrumentation-fetch');

const zipkinFetch = wrapFetch(fetch, {
    tracer,
    serviceName: process.env.SERVICE_NAME + '-fetch-' + process.env.APPLICATION_PORT,
    port: process.env.APPLICATION_PORT
});

if (process.env.FETCH_URL != undefined) {
    setTimeout(function () {
        zipkinFetch(process.env.FETCH_URL).then(function (res) {
            return res.text();
        }).then(function (body) {
            console.log(body)
        });
    }, 1000)
}

var app = express();


//RECEIVER
app.use(function (request:express.Request, response:express.Response, next) {
    console.log(request.headers);

    next()
});

app.use(zipkinMiddleware({
    tracer,
    serviceName: process.env.SERVICE_NAME + '-middleware-' + process.env.APPLICATION_PORT,
    port: process.env.APPLICATION_PORT
}));

app.use('/', function (request:express.Request, response:express.Response, next) {
    response.send('Hi');
});





app.listen(process.env.APPLICATION_PORT, function () {
    console.log('The PetStore sample is now running at http://localhost:' + process.env.APPLICATION_PORT);
});