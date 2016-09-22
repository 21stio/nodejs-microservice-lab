import {DependencyResolver} from "../../app/DependencyResolver";
import {AResolver} from "../AResolver";

export abstract class AAspectResolver extends AResolver {

    constructor(protected dependencyResolver:DependencyResolver) {
        super();
    }

    protected abstract getAspects();

    initialize():void {
        var self = this;

        for (let aspectsClass of self.getAspects()) {
            (new aspectsClass(self.dependencyResolver).initialize())
        }
    }
}