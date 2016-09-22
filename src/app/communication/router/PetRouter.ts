import {IRouter} from "../../../framework/communication/IRouter";
import {PetRepository} from "../../persistence/repository/PetRepository";
import {IRoute} from "../../../framework/communication/IRoute";
import * as express from "express"

export class PetRouter implements IRouter {

    constructor(protected petRepository:PetRepository) {
    }

    getPath():string {
        return "/pets";
    }

    getRoutes():[IRoute] {
        var self = this;

        return [
            {
                method: "get",
                path: "",
                handler: function (request: express.Request) {
                    return self.petRepository.getPets();
                }
            },
            {
                method: "post",
                path: "",
                handler: function (request: express.Request) {
                    return self.petRepository.createPet(request.body);
                }
            },
            {
                method: "get",
                path: "/:id",
                handler: function (request: express.Request) {
                    return self.petRepository.getPetById(request.params.id)
                }
            },
            {
                method: "put",
                path: "/:id",
                handler: function (request: express.Request) {
                    return self.petRepository.updatePet(request.params.id, request.body)
                }
            },
            {
                method: "delete",
                path: "/:id",
                handler: function (request: express.Request) {
                    return self.petRepository.deletePet(request.params.id)
                }
            }
        ]
    }
}