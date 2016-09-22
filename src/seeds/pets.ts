import * as knex from "knex";

exports.seed = function (knex: knex, Promise) {

    return knex("pets").del()
        .then(function () {
            return Promise.all([
                knex("pets").insert({name: "name1", tag: "tag1"}),
                knex("pets").insert({name: "name2", tag: "tag2"}),
                knex("pets").insert({name: "name3", tag: "tag3"}),
                knex("pets").insert({name: "name4", tag: "tag4"}),
                knex("pets").insert({name: "name5", tag: "tag5"}),
                knex("pets").insert({name: "name6", tag: "tag6"})
            ]);
        });
};
