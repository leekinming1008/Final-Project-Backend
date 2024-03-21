import {Schema, model} from "mongoose"

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    emailAddress: {
        type: String,
        required: [true, "Email Address is required"]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        maxlangth: 10,
        minlangth: 10 
    },
    address: {
        type: String,
        required: [true, "Address is required"],  
    },
    wishList: {
        type: Array,
        required: [false],
    }

})

export default model("user", userSchema)