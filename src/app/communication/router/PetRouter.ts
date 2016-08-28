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
                path: "/api/pets/:id",
                handler: function (data) {
                    return self.petRepository.getPetById(data)
                }
            },
            {
                method: "get",
                path: "/api/pets",
                handler: function (data) {
                    return self.petRepository.getPets()
                }
            },
            {
                method: "post",
                path: "/api/pets",
                handler: function (data) {
                    return self.petRepository.createPet(data)
                }
            }
        ]
    }
}