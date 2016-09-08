import {ARepository} from "../../../framework/persistence/ARepository";
import * as Pet from "../entity/Pet";
import * as Promise from "bluebird";

export class PetRepository extends ARepository {

    protected getTableName(): string {
        return 'pets'
    }

    getPetById(id: number):Promise<Pet.IPet> {
        let self = this;

        return self.getAdapter().where('id', id).then(self.handleGetById);
    }

    getPets():Promise<[Pet.IPet]> {
        let self = this;

        return self.getAdapter().select();
    }

    createPet(petBody:Pet.IPetBody):Promise<boolean> {
        let self = this;

        return self.getAdapter().insert(petBody).then(function (data) {
            return true;
        });
    }

    updatePet(id: number, petBody:Pet.IPetBody):Promise<boolean> {
        let self = this;

        return self.getAdapter().where('id', id).update(petBody).then(self.handleUpdateById);
    }

    deletePet(id:number):Promise<boolean> {
        let self = this;

        return self.getAdapter().where('id', id).del().then(self.handleDeleteById);
    }
}