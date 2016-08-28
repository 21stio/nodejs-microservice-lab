import * as Knex from "knex"
import {PetRepository} from "./repository/PetRepository";

export class PersistenceResolver {

    protected knex:Knex = null;
    protected knexConfig:Knex.Config = null;
    protected petRepository:PetRepository = null;

    constructor(knexConfig:Knex.Config) {
        this.knexConfig = knexConfig;
    }

    protected getKnex():Knex {
        var self = this;

        if (self.knex == null) {
            self.knex = Knex(self.knexConfig);
        }

        return self.knex;
    }

    getPetRepository() {
        var self = this;

        return new PetRepository(self.getKnex());
    }
}