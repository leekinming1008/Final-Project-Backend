import { Schema, model } from "mongoose";
import category from "./Category";

const postSchema = new Schema({
    image: {
        type: String,
        required: [true, "Image link is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: Schema.ObjectId,
        ref: `category`,
        required: [true, "Category is required"]
    },
    userID: {
        type: Schema.ObjectId,
        ref: `user`,
        required: [true, "UserID is required"]
    },
},
{timestamps:true})

export default model("post", postSchema)