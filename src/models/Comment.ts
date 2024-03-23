import {Schema, model} from "mongoose"

const commentSchema = new Schema({
    targetUserID: {
        type: Schema.ObjectId,
        ref: `user`,
        required: [true, "Target user id is required"]
    },
    sourceUserID: {
        type: Schema.ObjectId,
        ref: `user`,
        required: [true, "Source user id is required"]
    },
    comment: {
        type: String,
        required: [true, "Comment is needed"]
    }
})

export default model("comment", commentSchema)