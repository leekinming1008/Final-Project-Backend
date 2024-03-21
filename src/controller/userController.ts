import User from "../models/User";
import {Request, Response} from "express";

export const getUserInfo = async (req: Request, res: Response) => {
    
    try {
        const {userId} = req.params;
        const response = User.findById(userId);
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
                plane: response,
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