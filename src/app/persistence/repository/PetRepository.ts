import * as Knex from "knex"
import * as Promise from "bluebird"
import {ARepository} from "../abstract/ARepository";
import * as Contracts from "../../Contracts";

export class PetRepository extends ARepository {

    protected tableName = 'pets';

    getPetById(id: number):Promise<any> {
        return this.getAdapter().where('id', id).then(function (data) {
            return data[0]
        });
    }

    getPets():Promise<[any]> {
        return this.getAdapter().select();
    }

    createPet(data:Contracts.CreatePet) {
        return this.getAdapter().insert(data);
    }

    updatePet(id: number, data:Contracts.UpdatePet) {
        return this.getAdapter().where('id', id).update(data).then(function (data) {
            return {'yo': 'nice'};
        });
    }

    deletePet(id:number ) {
        return this.getAdapter().where('id', id).del().then(function (data) {
            return {'yo': 'nice'};
        });
    }
}