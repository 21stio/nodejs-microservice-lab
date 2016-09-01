import {DependencyResolver} from "../../app/DependencyResolver";

export abstract class AAspect {

    protected dependencyResolver:DependencyResolver = null;

    constructor(dependencyResolver:DependencyResolver) {
        this.dependencyResolver = dependencyResolver;
    }

    abstract initialize():void;
}