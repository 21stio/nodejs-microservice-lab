export interface CreatePet {
    name:string;
    tag?:string;
}

export interface UpdatePet extends CreatePet {}

export interface Pet {
    id:number;
    name:string;
    tag?:string;
}

export interface Error {
    name:string;
    message:string;
}