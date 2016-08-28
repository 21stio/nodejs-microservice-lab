import {ACommunicationResolver} from "./abstract/ACommunicationResolver";
import {IRouter} from "./abstract/IRouter";
import {PetRouter} from "./router/PetRouter";

export class CommunicationResolver extends ACommunicationResolver {

    protected getRouters():[IRouter] {
        var self = this;

        return [
            new PetRouter(self.persistenceResolver.getPetRepository())
        ]
    }
}