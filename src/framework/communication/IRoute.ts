import * as Promise from "bluebird";
import * as express from "express"

export interface IRoute {
    method:string;
    path:string;
    handler:(request: express.Request) => Promise<any>;
}