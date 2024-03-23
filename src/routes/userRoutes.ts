import express from "express"
import {addProductToWishlist, checkUserPassword, createUser, deleteUser, editUser, getUserInfo, getWishlistbyUser} from "../controller/userController"

const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/login").get(checkUserPassword);
userRouter.route("/wishlist").get(getWishlistbyUser).post(addProductToWishlist);
userRouter.route("/:userID").get(getUserInfo).patch(editUser).put(editUser).delete(deleteUser);

export default userRouter