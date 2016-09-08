import {IRouter} from "../../../framework/communication/IRouter";
import {PetRepository} from "../../persistence/repository/PetRepository";
import {IRoute} from "../../../framework/communication/IRoute";

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
                handler: function () {
                    return self.petRepository.getPets()
                }
            },
            {
                method: "post",
                path: "",
                handler: function (id:number, data) {
                    return self.petRepository.createPet(data)
                }
            },
            {
                method: "get",
                path: "/:id",
                handler: function (id:number) {
                    return self.petRepository.getPetById(id)
                }
            },
            {
                method: "put",
                path: "/:id",
                handler: function (id:number, data) {
                    return self.petRepository.updatePet(id, data)
                }
            },
            {
                method: "delete",
                path: "/:id",
                handler: function (id:number) {
                    return self.petRepository.deletePet(id)
                }
            }
        ]
    }
}