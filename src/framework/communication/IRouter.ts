import {IRoute} from "./IRoute";

export interface IRouter {
    getRoutes():[IRoute];
    getPath():string;
}