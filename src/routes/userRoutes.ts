import express from "express"
import {addProductToWishlist, checkUserPassword, createUser, deleteUser, editUser, getUserInfo} from "../controller/userController"

const userRouter = express.Router();

userRouter.route("/login").get(checkUserPassword);
userRouter.route("/:userId").get(getUserInfo).patch(editUser).put(editUser).delete(deleteUser);
userRouter.route("/").post(createUser);
userRouter.route("/addWishlist").post(addProductToWishlist);

export default userRouter