import * as Knex from "knex";

function getDatabaseClient() {
    if (process.env.DATABASE_CLIENT == undefined) {
        throw Error('process.env.DATABASE_CLIENT is not set!');
    }

    return process.env.DATABASE_CLIENT;
}

function getDatabaseHost() {
    if (process.env.DATABASE_HOST == undefined) {
        throw Error('process.env.DATABASE_HOST is not set!');
    }

    return process.env.DATABASE_HOST;
}

function getDatabasePort() {
    if (process.env.DATABASE_PORT == undefined) {
        throw Error('process.env.DATABASE_PORT is not set!');
    }

    return process.env.DATABASE_PORT;
}

function getDatabase() {
    if (process.env.DATABASE_DATABASE == undefined) {
        throw Error('process.env.DATABASE_DATABASE is not set!');
    }

    return process.env.DATABASE_DATABASE;
}

function getDatabaseUsername() {
    if (process.env.DATABASE_USERNAME == undefined) {
        throw Error('process.env.DATABASE_USERNAME is not set!');
    }

    return process.env.DATABASE_USERNAME;
}

function getDatabasePassword() {
    if (process.env.DATABASE_PASSWORD == undefined) {
        throw Error('process.env.DATABASE_PASSWORD is not set!');
    }

    return process.env.DATABASE_PASSWORD;
}

export var knexConfig:Knex.Config = {
    client: getDatabaseClient(),
    connection: {
        host: getDatabaseHost(),
        port: getDatabasePort(),
        database: getDatabase(),
        user: getDatabaseUsername(),
        password: getDatabasePassword()
    },
    pool: {
        min: 5,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};