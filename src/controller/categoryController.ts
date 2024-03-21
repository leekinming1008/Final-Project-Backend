import {Request, Response} from "express";
import Category from "../models/Category";

export const getAllCategory = async (req: Request, res: Response) => {   
    try {
        const response = await Category.find()
        res.status(200).json({
            status: "success",
            cateogry: response,
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error,
        })
        console.error("Get error for get all category function: ", error)
    }
}