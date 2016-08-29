import * as Promise from "bluebird"

export interface IRoute {
    method:string;
    path:string;
    handler:(id?: number, params?:any) => Promise<any>;
}