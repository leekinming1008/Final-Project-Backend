import express from "express"
import {getUserInfo} from "../controller/userController"

const userRouter = express.Router();

userRouter.route("/:userId").get(getUserInfo);

export default userRouter