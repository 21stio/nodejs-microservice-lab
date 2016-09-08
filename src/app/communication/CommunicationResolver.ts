import {ACommunicationResolver} from "../../framework/communication/ACommunicationResolver";
import {IRouter} from "../../framework/communication/IRouter";
import {PetRouter} from "./router/PetRouter";
import {FooRouter} from "./router/FooRouter";

export class CommunicationResolver extends ACommunicationResolver {

    protected getRouters():[IRouter] {
        var self = this;

        return [
            new PetRouter(self.persistenceResolver.getPetRepository()),
            new FooRouter()
        ]
    }
}