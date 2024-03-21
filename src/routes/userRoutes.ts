import express from "express"
import {createUser, getUserInfo} from "../controller/userController"

const userRouter = express.Router();

userRouter.route("/:userId").get(getUserInfo);
userRouter.route("/").post(createUser);

export default userRouter