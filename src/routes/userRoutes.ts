import express from "express"
import {addProductToWishlist, checkUserPassword, createUser, deleteUser, editUser, getUserInfo, getWishlistbyUser, removeProductFromWishlist} from "../controller/userController"

const userRouter = express.Router();

userRouter.route("/").post(createUser);
userRouter.route("/login").post(checkUserPassword);
userRouter.route("/wishlist").get(getWishlistbyUser).post(addProductToWishlist).delete(removeProductFromWishlist);
userRouter.route("/:userID").get(getUserInfo).patch(editUser).put(editUser).delete(deleteUser);

export default userRouter