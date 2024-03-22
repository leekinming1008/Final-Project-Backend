import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    userID: {
        type: String,
        required: [true, "UserID is required"]
    },
},
{timestamps:true})

export default model("product", productSchema)