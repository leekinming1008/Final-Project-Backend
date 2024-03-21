import {Schema, model} from "mongoose"

const commentSchema = new Schema({
    targetUserID: {
        type: String,
        required: [true, "Target user id is required"]
    },
    sourceUserID: {
        type: String,
        required: [true, "Source user id is required"]
    },
    comment: {
        type: String,
        required: [true, "Comment is needed"]
    }
})

export default model("comment", commentSchema)