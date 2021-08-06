import { Schema } from "mongoose";

const descriptionSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            trim: true
        },
        ol_type: {
            type: String,
            required: false
        },
        text: {
            type: [String],
            required: true,
            trim: true
        }
    }
);

export default descriptionSchema;