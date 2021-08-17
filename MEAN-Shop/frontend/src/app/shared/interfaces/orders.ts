import { Product } from "./product";
import { UserAddress } from "./user-address";
import { UserCreditCards } from "./user-credit-cards";

export interface Orders {
    _id?: string,
    uid?: string,
    status: string,
    address: UserAddress[],
    creditCard: UserCreditCards,
    order: Product[],
    instructions: string,
    createdAt?: string,
    updatedAt?: string
}
