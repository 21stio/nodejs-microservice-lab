import * as Knex from "knex"
import {AResolver} from "../AResolver";

export abstract class APersistenceResolver extends AResolver {

    protected knexConfig:Knex.Config = null;

    constructor(knexConfig:Knex.Config) {
        super();

        this.knexConfig = knexConfig;
    }

    protected getKnex():Knex {
        var self = this;

        return self.cache(function () {
           return Knex(self.knexConfig);
        });
    }
}