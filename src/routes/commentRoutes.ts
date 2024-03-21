import express from "express"
import { createComment, getCommentforUser } from "../controller/commentController";

const commentRouter = express.Router();

commentRouter.route("/:userId").get(getCommentforUser);
commentRouter.route("/").post(createComment);

export default commentRouter