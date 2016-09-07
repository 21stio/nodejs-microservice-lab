import * as knex from "knex";

exports.up = function (knex, Promise) {
    return knex.schema.withSchema("public").createTable("pets", function (table:knex.CreateTableBuilder) {
        table.increments("id").primary();
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
        table.string("name").notNullable();
        table.string("tag");
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.withSchema("public").dropTable("pets");
};
