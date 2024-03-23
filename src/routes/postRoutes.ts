import express from "express";
import {getAllPosts, getUserposts, addpost, editpost, removepost} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/").get(getAllPosts);
postRouter.route("/:userID").get(getUserposts);
postRouter.route("/").post(addpost);
postRouter.route("/:postID").put(editpost);
postRouter.route("/:postID").delete(removepost);

export default postRouter;