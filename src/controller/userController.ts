import mongoose from "mongoose";
import {Request, Response} from "express";
import Comment from "../models/Comment";
import User from "../models/User";
import post from "../models/post";
import Product from "../models/product"

export const getUserInfo = async (req: Request, res: Response) => {
    console.log("Enter the get user info function");   
    try {
        const {userID} = req.params;
        const response = await User.findById(userID).populate(`wishList`);
        res.status(200).json({
            status: "success",
            data: response,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Get error for get user info function: ", error)
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
            const isEmailAddressAppear = await User.find({emailAddress: req.body.emailAddress});
            if (isEmailAddressAppear.length != 0) {
                res.status(400).json({
                    status: "fail",
                    message: "The email address already exist in the database" 
                });
            } else {
                const response = await User.create(req.body);
                res.status(201).json({
                    status: "success",
                    data: {
                        AddedUser: response,
                    }
                });
            }
            
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Get error for create user function: ", error)
    }
}

export const checkUserPassword = async (req: Request, res:Response) => {
    try {
        const {emailAddress, password} = req.body;
        const response = await User.findOne({emailAddress: emailAddress});
        res.status(201).json({
            status: "success",
            result: password == response?.password,
            userID: response?.id
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Get error for check user password function: ", error)
    }
}

export const editUser = async (req: Request, res: Response)=> {
    try {
        const {userID} = req.params;
        const updatedInfo = req.body;
        const isEmailAddressAppear = await User.find({emailAddress: updatedInfo.emailAddress});
        if (isEmailAddressAppear.length == 1 && userID == isEmailAddressAppear[0]._id.toString()) {
            const response = await User.updateOne({_id: userID}, updatedInfo);
            res.status(201).json({
                status: "success",
                updatedInfo: response
            });
        } else {
            res.status(400).json({
                status: "fail",
                message: "The email is not unique"
            });
        }
        
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Error catch when calling the edit user function.", error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {userID} = req.params;
        const userDelete = await User.deleteOne({_id: userID});
        const productDelete = await Product.deleteMany({userID: userID});
        const postDelete = await post.deleteMany({userID: userID});
        const commentDelete = await Comment.deleteMany({targetUserID: userID} || {sourceUserID: userID});
        res.status(202).json({
            status: "success",
            deletedItems: [userDelete, productDelete, postDelete, commentDelete]
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Error catch when calling the delete user function.", error);
    }   
}

export const addProductToWishlist = async (req: Request, res: Response) => {
    try {
        const {userID, productID} = req.body;
        const user = await User.findById(userID);
        const product = await Product.findById(productID);
        if (user && product) {
            user.wishList.push(product._id);
            const response = await User.updateOne({_id: userID}, user);
            res.status(202).json({
                status: "success",
                updatedResult: response
            });
        } else {
            res.status(400).json({
                status: "fail",
                message: "User is not found"
            });
        }
        
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Error catch when calling the add product to wishlist function.", error);
    }   
}

export const getWishlistbyUser = async (req: Request, res:Response) => {
    try {
        const {userID} = req.body;
        const response = await User.findById(userID).populate(`wishList`);
        res.status(202).json({
            status: "success",
            wishlist: response?.wishList
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Error catch when calling the get wishlist by user function.", error);
    }
}

export const removeProductFromWishlist = async (req: Request, res: Response) => {
    const {userID, productID} = req.body;
    const user = await User.findById(userID);
    console.log(user);
    try {
        if (user) {
            const userWishlist = user.wishList;
            const objectId = mongoose.Types.ObjectId.createFromHexString(productID);

            userWishlist.splice(userWishlist.indexOf(objectId), 1);
            const response = await User.updateOne({_id: userID}, user);
            res.status(202).json({
                status: "success",
                wishlist: response
            });
        } else {
            res.status(400).json({
                status: "fail",
                message: "User is not found"
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Error catch when calling the remove product from wish list function.", error);
    }
}