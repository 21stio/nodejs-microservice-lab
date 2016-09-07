export interface IPetBody {
    name: string;
    tag?: string;
}

export interface IEntity {
    created_at: string;
    updated_at: string;
}

export interface IPet extends IPetBody, IEntity {
    id: number;
}