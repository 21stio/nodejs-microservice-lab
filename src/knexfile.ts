var connection = {
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

module.exports = {
    development: connection,
    production: connection
};
