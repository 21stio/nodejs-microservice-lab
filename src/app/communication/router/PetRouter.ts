import {IRouter} from "../abstract/IRouter";
import {PetRepository} from "../../persistence/repository/PetRepository";
import {IRoute} from "../abstract/IRoute";

export class PetRouter implements IRouter {

    protected petRepository:PetRepository = null;

    constructor(petRepository:PetRepository) {
        this.petRepository = petRepository;
    }

    getRoutes():[IRoute] {
        var self = this;

        return [
            {
                method: "get",
                path: "/pets",
                handler: function () {
                    return self.petRepository.getPets()
                }
            },
            {
                method: "post",
                path: "/pets",
                handler: function (id:number, data) {
                    return self.petRepository.createPet(data)
                }
            },
            {
                method: "get",
                path: "/pets/:id",
                handler: function (id:number) {
                    return self.petRepository.getPetById(id)
                }
            },
            {
                method: "put",
                path: "/pets/:id",
                handler: function (id:number, data) {
                    return self.petRepository.updatePet(id, data)
                }
            },
            {
                method: "delete",
                path: "/pets/:id",
                handler: function (id:number) {
                    return self.petRepository.deletePet(id)
                }
            }
        ]
    }
}