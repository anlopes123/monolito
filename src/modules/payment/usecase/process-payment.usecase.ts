import UseCaseInterface from "../../@shared/domain/usecase/use-case.interface";
import Transaction from "../domain/transaction";
import PaymentGetway from "../gatway/payment.gatway";
import { ProcessPaymentInputDto, ProcessPaymentOutputDto } from "./process-payment.dto";

export default class ProcessPaymentUseCase implements UseCaseInterface {

    constructor(private transactionRepository: PaymentGetway) {

    }
    async execute(input: ProcessPaymentInputDto): Promise<ProcessPaymentOutputDto> {
        const  transaction = new Transaction({
            amount: input.amount,
            orderId: input.oderId,  
        });

        transaction.process();

        const persistTransaction = await this.transactionRepository.save(transaction);

        return {
            transactionId: persistTransaction.id.id,
            orderId: persistTransaction.orderId,
            amount: persistTransaction.amout,
            status: transaction.status,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,

        }
    }

}