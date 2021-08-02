import { Schema, model } from "mongoose";

const tokenSchema = new Schema(
    {
        uid: {
            type: String,
            required: true
        },
        token: { //refresh token
            type: String,
            default: ''
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model( 'Token', tokenSchema );