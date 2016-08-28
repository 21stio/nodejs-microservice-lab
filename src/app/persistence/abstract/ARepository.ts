import * as Knex from "knex"
import * as Promise from "bluebird"

export abstract class ARepository {

    protected tableName:string = null;
    protected knex:Knex = null;

    constructor(knex:Knex) {
        this.knex = knex;
    }

    protected getAdapter(){
        return this.knex(this.tableName)
    }
}