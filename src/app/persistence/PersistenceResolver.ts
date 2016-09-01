import {PetRepository} from "./repository/PetRepository";
import {APersistenceResolver} from "../../framework/persistence/APersistenceResolver";

export class PersistenceResolver extends APersistenceResolver {

    getPetRepository():PetRepository {
        var self = this;

        return self.cache(function () {
            return new PetRepository(self.getKnex());
        });
    }
}