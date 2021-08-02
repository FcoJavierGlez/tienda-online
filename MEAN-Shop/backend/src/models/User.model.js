import { Schema, model } from "mongoose";
import { ProductSchema } from './Product.model';

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
        /* address: {
            streetType: String
        }, */
        cart: {
            type: [ProductSchema],//[Object]
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

/* const Product = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        images: {
            type: [String],
            default: []
        },
        quantity: {
            type: Number,
            default: 1

        },
        price: {
            type: Number,
            required: true
        },
        discount: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
); */

export default model( 'User', userSchema );