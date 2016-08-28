import * as Knex from "knex"
import {PersistenceResolver} from "./persistence/PersistenceResolver";
import {CommunicationResolver} from "./communication/CommunicationResolver";

export class DependencyResolver {

    protected knexConfig:Knex.Config = null;
    protected persistenceResolver:PersistenceResolver = null;
    protected communicationResolver:CommunicationResolver = null;

    constructor(knexConfig:Knex.Config) {
        var self = this;

        self.knexConfig = knexConfig;
    }

    getPersistenceResolver():PersistenceResolver {
        var self = this;

        if (self.persistenceResolver == null) {
            self.persistenceResolver = new PersistenceResolver(self.knexConfig);
        }

        return self.persistenceResolver;
    }

    getCommunicationResolver():CommunicationResolver {
        var self = this;

        if (self.communicationResolver == null) {
            self.communicationResolver = new CommunicationResolver(self.getPersistenceResolver());
        }

        return self.communicationResolver;
    }
}