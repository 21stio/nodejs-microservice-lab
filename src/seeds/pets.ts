import * as knex from "knex";

exports.seed = function (knex: knex, Promise) {

    return knex("pets").del()
        .then(function () {
            return Promise.all([
                knex("pets").insert({name: "Walter", tag: "dog"}),
                knex("pets").insert({name: "Mike", tag: "cat"}),
                knex("pets").insert({name: "Frank", tag: "turtle"})
            ]);
        });
};
