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
                path: "/api/pets",
                handler: function () {
                    return self.petRepository.getPets()
                }
            },
            {
                method: "post",
                path: "/api/pets",
                handler: function (id:number, data) {
                    return self.petRepository.createPet(data)
                }
            },
            {
                method: "get",
                path: "/api/pets/:id",
                handler: function (id:number) {
                    return self.petRepository.getPetById(id)
                }
            },
            {
                method: "put",
                path: "/api/pets/:id",
                handler: function (id:number, data) {
                    return self.petRepository.updatePet(id, data)
                }
            },
            {
                method: "delete",
                path: "/api/pets/:id",
                handler: function (id:number) {
                    return self.petRepository.deletePet(id)
                }
            }
        ]
    }
}