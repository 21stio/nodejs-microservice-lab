export interface IResponse {
    success: boolean;
}

export interface IMessageResponse extends IResponse {
    message?:string;
}

export interface IDataResponse extends IResponse {
    data:any;
}