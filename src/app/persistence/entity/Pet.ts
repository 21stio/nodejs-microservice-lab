export interface IPetBody {
    name: string;
    tag?: string;
}

export interface IPet extends IPetBody {
    id: number;
}