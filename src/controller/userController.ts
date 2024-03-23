import Comment from "../models/Comment";
import User from "../models/User";
import post from "../models/post";
import Product from "../models/product"
import {Request, Response} from "express";

export const getUserInfo = async (req: Request, res: Response) => {
    console.log("Enter the get user info function");   
    try {
        const {userID} = req.params;
        console.log(userID)
        const response = await User.findById(userID);
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
            const response = await User.create(req.body);
            res.status(201).json({
            status: "success",
            data: {
                AddedUser: response,
            }
        });
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
        const response = await User.updateOne({_id: userID}, updatedInfo);
        res.status(201).json({
            status: "success",
            updatedInfo: response});
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Error catch when calling the edit user function.", error);
    }
}


// TODO: need to delete all the product, comment and user informaiton for that user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {userID} = req.params;
        const userDelete = await User.deleteOne({_id: userID});
        const productDelete = await Product.deleteMany({userID: userID});
        const postDelete = await post.deleteMany({userID: userID});
        const commentDelete = await Comment.deleteMany({targetUserID: userID} || {sourceUserID: userID});
        res.status(202).json({
            status: "success",
            deletedItems: [userDelete, productDelete, postDelete, commentDelete]});
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
            user.wishList.push(product);
            const response = await User.updateOne({_id: userID}, user);
            res.status(202).json({
                status: "success",
                updatedResult: response
            });
        } else {
            res.status(202).json({
                status: "success",
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
        const response = await User.findById(userID);
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