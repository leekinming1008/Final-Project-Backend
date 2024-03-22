import express from "express";
import {getAllPosts, getUserposts, addpost, editpost, removepost} from "../controller/postController";

const postRouter = express.Router();

postRouter.route("/post").get(getAllPosts);
postRouter.route("/post/:userId").get(getUserposts);
postRouter.route("/post").post(addpost);
postRouter.route("/post/:postId").put(editpost);
postRouter.route("/post/:postId").delete(removepost);