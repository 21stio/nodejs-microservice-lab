import * as Promise from "bluebird"

export interface IRoute {
    method:string;
    path:string;
    handler:(params:any) => Promise<any>;
}