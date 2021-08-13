import { Schema, model } from "mongoose";
import { ProductSchema } from './Product.model';
import { UserAddressSchema } from './UserAddress.model';
import { UserCreditCards } from './UserCreditCards.model';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        surname: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        addresses: {
            type: [UserAddressSchema],
            default: []
        },
        cart: {
            type: [ProductSchema],
            default: []
        },
        creditCards: {
            type: [UserCreditCards],
            default: []
        },
        uid: {
            type: String,
            required: true
        },
        profile: {
            type: String,
            default: 'USER'
        },
        state: {
            type: String,
            default: 'PENDING'
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model( 'User', userSchema );