import express from "express"
import {addProductToWishlist, checkUserPassword, createUser, deleteUser, editUser, getUserInfo, getWishlistbyUser} from "../controller/userController"

const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/login").get(checkUserPassword);
userRouter.route("/getWishlist").get(getWishlistbyUser);
userRouter.route("/addWishlist").post(addProductToWishlist);
userRouter.route("/:userId").get(getUserInfo).patch(editUser).put(editUser).delete(deleteUser);

export default userRouter