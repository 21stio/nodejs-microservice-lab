import * as express from "express";
import * as swaggerMiddleware from "swagger-express-middleware";
import * as Knex from "knex";
import {DependencyResolver} from "./app/DependencyResolver";


var app = express();

var knexConfig:Knex.Config = {
    client: process.env.DATABASE_CLIENT,
    connection: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        database: process.env.DATABASE_DATABASE,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};

swaggerMiddleware('swagger.yml', app, function (err, middleware) {
    app.use(
        middleware.metadata(),
        middleware.CORS(),
        middleware.files(),
        middleware.parseRequest(),
        middleware.validateRequest()
    );

    var dependencyResolver = new DependencyResolver(knexConfig);

    dependencyResolver.getCommunicationResolver().attachRouters('/v1', app);


    app.listen(process.env.APPLICATION_PORT, function () {
        console.log('The PetStore sample is now running at http://localhost:' + process.env.APPLICATION_PORT);
    });
});