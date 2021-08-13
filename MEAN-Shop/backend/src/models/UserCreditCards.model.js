import { Schema, model } from "mongoose";

const userCreditCards = new Schema(
    {
        id: {
            type: Number,
            required: true
        },
        cardNumber: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        month: {
            type: Number,
            required: true
        },
        year: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default userCreditCards;