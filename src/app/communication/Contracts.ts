import * as Contracts from "../../framework/communication/Contracts";
import * as IPet from "../persistence/entity/Pet";

export interface IPetResponse extends Contracts.IDataResponse {
    data: IPet.IPet
}

export interface IPetsResponse extends Contracts.IDataResponse {
    data: [IPet.IPet]
}

export interface IPetBodyRequest extends IPet.IPetBody {}

interface IRender {
    IPetResponse: IPetResponse,
    IPetsResponse: IPetsResponse,
    IPetBodyRequest: IPetBodyRequest,
    IMessageResponse: Contracts.IMessageResponse
}