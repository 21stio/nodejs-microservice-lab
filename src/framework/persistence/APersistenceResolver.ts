import * as Knex from "knex"
import {AResolver} from "../AResolver";
import {DependencyResolver} from "../../app/DependencyResolver";

export abstract class APersistenceResolver extends AResolver {

    constructor(protected dependencyResolver: DependencyResolver) {
        super();
    }

    protected getKnex():Knex {
        var self = this;

        return self.cache("Knex", function () {
           return Knex(self.dependencyResolver.getConfigurationResolver().getKnexConfig());
        });
    }
}