import {PersistenceResolver} from "./persistence/PersistenceResolver";
import {CommunicationResolver} from "./communication/CommunicationResolver";
import {ConfigurationResolver} from "./configuration/ConfigurationResolver";
import {MiddlewareResolver} from "./MiddlewareResolver";
import {AspectResolver} from "./aspect/AspectResolver";
import {PackageResolver} from "./PackageResolver";
import {AResolver} from "../framework/AResolver";
import {BusinessResolver} from "./business/BusinessResolver";

export class DependencyResolver extends AResolver {

    getPersistenceResolver():PersistenceResolver {
        let self = this;

        return self.cache("PersistenceResolver", function () {
            return new PersistenceResolver(self);
        });
    }

    getCommunicationResolver():CommunicationResolver {
        let self = this;

        return self.cache("CommunicationResolver", function () {
            return new CommunicationResolver(self);
        });
    }

    getBusinessResolver():BusinessResolver {
        let self = this;

        return self.cache("BusinessResolver", function () {
            return new BusinessResolver(self);
        });
    }

    getConfigurationResolver():ConfigurationResolver {
        let self = this;

        return self.cache("ConfigurationResolver", function () {
            return new ConfigurationResolver();
        });
    }

    getMiddlewareResolver():MiddlewareResolver {
        let self = this;

        return self.cache("MiddlewareResolver", function () {
            return new MiddlewareResolver(self);
        });
    }

    getAspectsResolver():AspectResolver {
        let self = this;

        return self.cache("AspectResolver", function () {
            return new AspectResolver(self);
        });
    }

    getPackageResolver():PackageResolver {
        let self = this;

        return self.cache("PackageResolver", function () {
            return new PackageResolver(self);
        });
    }
}

