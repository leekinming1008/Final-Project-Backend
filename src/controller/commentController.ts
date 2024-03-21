import comment from "../models/Comment";
import {Request, Response} from "express";
import User from "../models/User";

export const getCommentforUser = async (req: Request, res: Response) => {   
    try {
        const {userId} = req.params;
        const response = await comment.find({targetUserID: userId})
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
            const targetUser = await User.findById(req.body.targetUserID);
            const sourceUser = await User.findById(req.body.sourceUserID);
            if (targetUser && sourceUser) {
                const response = await comment.create(req.body);
                res.status(201).json({
                    status: "success",
                    data: {
                        addedComment: response,
                    }
                });
            } else {
                res.status(201).json({
                    status: "success",
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