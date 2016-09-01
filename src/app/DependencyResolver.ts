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
        var self = this;

        return self.cache(function () {
            return new PersistenceResolver(self.getConfigurationResolver().getKnexConfig())
        });
    }

    getCommunicationResolver():CommunicationResolver {
        var self = this;

        return self.cache(function () {
            return new CommunicationResolver(self.getPersistenceResolver(), self.getBusinessResolver());
        });
    }

    getBusinessResolver():BusinessResolver {
        var self = this;

        return self.cache(function () {
            return new BusinessResolver(self.getPersistenceResolver());
        });
    }

    getConfigurationResolver():ConfigurationResolver {
        var self = this;

        return self.cache(function () {
            return new ConfigurationResolver();
        });
    }

    getMiddlewareResolver():MiddlewareResolver {
        var self = this;

        return self.cache(function () {
            return new MiddlewareResolver(self.getCommunicationResolver().getRouter('/v1'), self.getConfigurationResolver().getWinstonTransports(), self.getPackageResolver().getZipkinMiddleware());
        });
    }

    getAspectsResolver():AspectResolver {
        var self = this;

        return self.cache(function () {
            return new AspectResolver(self);
        });
    }

    getPackageResolver():PackageResolver {
        var self = this;

        return self.cache(function () {
            return new PackageResolver(self.getConfigurationResolver());
        });
    }
}

