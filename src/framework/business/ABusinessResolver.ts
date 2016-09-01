import {AResolver} from "../AResolver";
import {PersistenceResolver} from "../../app/persistence/PersistenceResolver";

export abstract class ABusinessResolver extends AResolver {

    protected persistenceResolver:PersistenceResolver = null;

    constructor(persistenceResolver:PersistenceResolver) {
        super();
        this.persistenceResolver = persistenceResolver;
    }
}