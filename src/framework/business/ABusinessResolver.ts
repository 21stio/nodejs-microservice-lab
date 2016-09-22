import {AResolver} from "../AResolver";
import {DependencyResolver} from "../../app/DependencyResolver";

export abstract class ABusinessResolver extends AResolver {

    constructor(protected dependencyResolver: DependencyResolver) {
        super();
    }
}