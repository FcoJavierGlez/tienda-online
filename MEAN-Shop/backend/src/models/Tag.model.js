import { Schema, model } from "mongoose";

const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        search: {
            type: Number,
            default: 0
        },
    }
);

export default model( "Tags", tagSchema );