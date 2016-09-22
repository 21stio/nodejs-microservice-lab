import {AAspect} from "../../../framework/aspect/AAspect";
var meld = require('meld');

export class LoggingAspect extends AAspect {

    initialize():void {
        var self = this;

        meld.before(self.dependencyResolver.getPersistenceResolver().getPetRepository(), 'getPetById', function(parameters) {
            self.dependencyResolver.getPackageResolver().getLogger().info('logging-aspect', 'method', {method: "getPetById", parameters: parameters});
        });
    }
}