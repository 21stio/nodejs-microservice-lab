import * as Knex from "knex"
import * as Promise from "bluebird"
import {ARepository} from "../abstract/ARepository";
import * as Contracts from "../../Contracts";

export class PetRepository extends ARepository {

    protected tableName = 'pets';

    getPetById(param:{id:number}):Promise<any> {
        return this.getAdapter().where('id', param.id).then(function (data) {
            return data[0]
        });
    }

    getPets():Promise<[any]> {
        return this.getAdapter().select();
    }

    createPet(data: Contracts.CreatePet) {
        return this.getAdapter().insert(data);
    }

}