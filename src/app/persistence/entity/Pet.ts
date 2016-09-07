import {IEntity} from "../../../framework/persistence/Contracts";

export interface IPetBody {
    name: string;
    tag?: string;
}

export interface IPet extends IPetBody, IEntity {
    id: number;
}