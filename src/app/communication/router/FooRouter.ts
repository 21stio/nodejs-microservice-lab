import {IRouter} from "../../../framework/communication/IRouter";
import {IRoute} from "../../../framework/communication/IRoute";
import * as Promise from "bluebird";

export class FooRouter implements IRouter {

    getPath():string {
        return "/foo";
    }

    getRoutes():[IRoute] {
        var self = this;

        return [
            {
                method: "get",
                path: "",
                handler: function () {
                    return new Promise(function (resolve) {
                        resolve('yoooo');
                    })
                }
            }
        ]
    }
}