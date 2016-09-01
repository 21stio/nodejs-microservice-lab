import {DependencyResolver} from "../../app/DependencyResolver";

export abstract class AAspectResolver {

    protected dependencyResolver:DependencyResolver = null;

    constructor(dependencyResolver:DependencyResolver) {
        this.dependencyResolver = dependencyResolver;
    }

    protected abstract getAspects();

    initialize():void {
        var self = this;

        for (let aspectsClass of self.getAspects()) {
            (new aspectsClass(self.dependencyResolver).initialize())
        }
    }
}