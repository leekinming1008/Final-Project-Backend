import { Schema, model } from "mongoose";

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
        type: String,
        required: [true, "Category is required"]
    },
    userID: {
        type: String,
        required: [true, "UserID is required"]
    },
},
{timestamps:true})

export default model("post", postSchema)