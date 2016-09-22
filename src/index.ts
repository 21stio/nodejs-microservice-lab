import * as express from "express";

import {DependencyResolver} from "./app/DependencyResolver";

let application = express();

let dependencyResolver = new DependencyResolver();

dependencyResolver.getMiddlewareResolver().attachMiddleware(application);

dependencyResolver.getAspectsResolver().initialize();

application.listen(dependencyResolver.getConfigurationResolver().getServiceConfig().port, function () {
    console.log("The PetStore sample is now running at http://localhost:" + dependencyResolver.getConfigurationResolver().getServiceConfig().port);
});
