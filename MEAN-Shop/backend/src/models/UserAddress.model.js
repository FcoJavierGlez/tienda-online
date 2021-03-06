import { model, Schema } from "mongoose";

const userAddressSchema = new Schema (
    {
        country: {
            type: String,
            default: 'España'
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        apartment: {
            type: String,
            default: ''
        },
        phone: {
            type: Number,
            required: true,
            trim: true
        },
        zipCode: {
            type: Number,
            required: true,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        province: {
            type: String,
            required: true,
            trim: true
        },
        nif: {
            type: String,
            required: true,
            trim: true
        },
        defaultAddress: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// export default userAddressSchema;
export default model('UserAddress', userAddressSchema);