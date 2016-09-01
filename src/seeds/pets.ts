import * as knex from "knex";

exports.seed = function (knex: knex, Promise) {

    return knex("pets").del()
        .then(function () {
            return Promise.all([
                knex("pets").insert({id: 1, name: "Walter", tag: "dog"}),
                knex("pets").insert({id: 2, name: "Mike", tag: "cat"}),
                knex("pets").insert({id: 3, name: "Frank", tag: "turtle"})
            ]);
        });
};
