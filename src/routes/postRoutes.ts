import express from "express";
import {getAllPosts, getUserposts, addpost, editpost, removepost} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/").get(getAllPosts);
postRouter.route("/:userID").get(getUserposts);
postRouter.route("/").post(addpost);
postRouter.route("/:postId").put(editpost);
postRouter.route("/:postId").delete(removepost);

export default postRouter;