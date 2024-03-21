import User from "../models/User";
import {Request, Response} from "express";

export const getUserInfo = async (req: Request, res: Response) => {
    
    try {
        const {userId} = req.params;
        const response = User.findById(userId);
        res.status(200).json({
            status: "success",
            response,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("error message: ", error)
    }
}