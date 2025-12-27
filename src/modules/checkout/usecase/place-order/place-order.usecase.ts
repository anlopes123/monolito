import UseCaseInterface from "../../../@shared/domain/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/cliente-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product.adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface
    constructor(clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
    }
    
    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
       const client = this._clientFacade.find({id: input.clientId});
       if(!client) {
         throw Error("Client not found");
         
       }

       await this.validateProducts(input);

       return null;
    }
    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if(input.products.length === 0) {
            throw new Error("No products selected");
        }

        for(const p of input.products) {
            const product = await this._productFacade.checkStock({
                productId: p.productId,
            });
            if (product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`)
            }
        }

    }
           
}