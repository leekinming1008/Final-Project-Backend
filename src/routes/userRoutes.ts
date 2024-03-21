import express from "express"
import {checkUserPassword, createUser, getUserInfo} from "../controller/userController"

const userRouter = express.Router();


userRouter.route("/login").get(checkUserPassword);
userRouter.route("/:userId").get(getUserInfo);
userRouter.route("/").post(createUser);

export default userRouter