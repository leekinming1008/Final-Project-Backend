import { Schema, model } from "mongoose";

const productSchema = new Schema({
    image: {
        type: String,
        required: [true, "The image is needed"]
    },
    name: {
        type: String,
        required: [true, "Name is required"]
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
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    userID: {
        type: Schema.ObjectId,
        ref: `user`,
        required: [true, "UserID is required"]
    },
},
{timestamps:true})

export default model("product", productSchema)