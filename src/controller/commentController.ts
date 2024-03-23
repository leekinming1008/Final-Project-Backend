import comment from "../models/Comment";
import {Request, Response} from "express";
import User from "../models/User";

export const getCommentforUser = async (req: Request, res: Response) => {   
    try {
        const {userID} = req.params;
        const response = await comment.find({targetUserID: userID})
        res.status(200).json({
            status: "success",
            comment: response,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Get error for get comment for user function: ", error)
    }
}

export const createComment = async (req: Request, res: Response) => {
    try {
            const {targetUserID, sourceUserID} = req.body;
            const targetUser = await User.findById(targetUserID);
            const sourceUser = await User.findById(sourceUserID);
            if (targetUser && sourceUser) {
                const response = await comment.create(req.body);
                res.status(201).json({
                    status: "success",
                    data: {
                        addedComment: response,
                    }
                });
            } else {
                res.status(400).json({
                    status: "fail",
                    message: "The target user or source user is not found, please double check"
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