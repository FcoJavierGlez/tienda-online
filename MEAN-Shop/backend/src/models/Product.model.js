import { Schema, model } from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        vendor: {
            type: String,
            default: ''
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
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        },
        discount: {
            type: Number,
            default: 0
        },
        tags: {
            type: [String],
            default: []
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export { productSchema };
export default model( 'Product', productSchema );