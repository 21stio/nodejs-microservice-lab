import {LoggingAspect} from "./aspect/LoggingAspect";
import {AAspectResolver} from "../../framework/aspect/AAspectResolver";

export class AspectResolver extends AAspectResolver {

    protected getAspects() {
        return [
            LoggingAspect
        ]
    }
}