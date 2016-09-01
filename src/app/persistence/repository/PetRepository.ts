import * as Promise from "bluebird"
import {ARepository} from "../../../framework/persistence/ARepository";
import * as Pet from "../entity/Pet";

export class PetRepository extends ARepository {

    protected getTableName(): string {
        return 'pets'
    }

    getPetById(id: number):Promise<any> {
        var self = this;

        return this.getAdapter().where('id', id).then(self.handleGetById);
    }

    getPets():Promise<Pet.IPet> {
        return this.getAdapter().select();
    }

    createPet(petBody:Pet.IPetBody) {
        return this.getAdapter().insert(petBody).then(function (data) {
            return true;
        });
    }

    updatePet(id: number, petBody:Pet.IPetBody) {
        var self = this;

        return this.getAdapter().where('id', id).update(petBody).then(self.handleUpdateById);
    }

    deletePet(id:number) {
        var self = this;

        return this.getAdapter().where('id', id).del().then(self.handleDeleteById);
    }
}