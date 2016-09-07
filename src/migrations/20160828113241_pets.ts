import * as knex from "knex";

exports.up = function (knex, Promise) {
    return knex.schema.withSchema("public").createTable("pets", function (table:knex.CreateTableBuilder) {
        table.increments("id").primary();
        table.timestamps();
        table.string("name").notNullable();
        table.string("tag");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema("public").dropTable("pets");
};
