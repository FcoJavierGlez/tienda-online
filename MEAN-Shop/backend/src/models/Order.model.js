import { Schema, model } from "mongoose";
import { UserAddressSchema } from './UserAddress.model';
import { UserCreditCardsSchema } from './UserCreditCards.model';
// import { ProductSchema } from './Product.model';

const orderModel = new Schema(
    {
        uid: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'Pendiente'
        },
        address: {
            type: { UserAddressSchema },
            required: true
        },
        creditCard: {
            type: { UserCreditCardsSchema },
            required: true
        },
        order: {
            type: [Object],
            required: true
        },
        instructions: {
            type: String,
            default: ''
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model( 'Orders', orderModel );