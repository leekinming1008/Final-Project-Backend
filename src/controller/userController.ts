import User from "../models/User";
import {Request, Response} from "express";

export const getUserInfo = async (req: Request, res: Response) => {   
    try {
        const {userId} = req.params;
        const response = await User.findById(userId);
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
        const {userId} = req.params;
        const updatedInfo = req.body;
        const response = await User.updateOne({_id: userId}, updatedInfo);
        res.status(201).json({
            status: "success",
            updatedInfo: response});
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Error catch when calling the edit planes function.", error);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const response = await User.deleteOne({_id: userId});
        res.status(202).json({
            status: "success",
            deletedUser: response});
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Error catch when calling the delete planes function.", error);
    }   
}