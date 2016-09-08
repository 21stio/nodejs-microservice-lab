import * as Knex from "knex"

export abstract class ARepository {

    protected knex:Knex = null;

    constructor(knex:Knex) {
        this.knex = knex;
    }

    protected getAdapter(){
        return this.knex(this.getTableName())
    }

    protected abstract getTableName():string;

    protected handleGetById(data: [any]) {
        if (data.length === 0) {
            throw Error('Entity not found')
        }

        return data[0];
    }

    protected handleUpdateById(data: number) {
        if (data === 0) {
            throw Error('Entity not found')
        }

        return true;
    }

    protected handleDeleteById(data: number) {
        if (data === 0) {
            throw Error('Entity not found')
        }

        return true;
    }
}