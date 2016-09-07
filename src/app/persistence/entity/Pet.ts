export interface IPetBody {
    name: string;
    tag?: string;
}

export interface IEntity {
    created_at: number;
    updated_at: number;
}

export interface IPet extends IPetBody, IEntity {
    id: number;
}