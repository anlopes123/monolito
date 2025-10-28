import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/cliente-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    
    private _clientFacade: ClientAdmFacadeInterface;
    constructor(clientFacade: ClientAdmFacadeInterface) {
        this._clientFacade = clientFacade;
    }
    
    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
       const client = this._clientFacade.find({id: input.clientId});
       if(!client) {
        throw Error("Client not found");
       }
    }
;
           
}