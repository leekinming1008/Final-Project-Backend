import express from "express"
import {checkUserPassword, createUser, editUser, getUserInfo} from "../controller/userController"

const userRouter = express.Router();


userRouter.route("/login").get(checkUserPassword);
userRouter.route("/:userId").get(getUserInfo).patch(editUser).put(editUser);
userRouter.route("/").post(createUser);

export default userRouter