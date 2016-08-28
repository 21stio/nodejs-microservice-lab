export interface CreatePet {
    name: string;
    tag?: string;
}

export interface Pet {
    id: number;
    name: string;
    tag?: string;
}

export interface Error {
    name: string;
    message: string;
}