import Product from "../models/product";
import {Request, Response} from "express";

// get all products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const data = await Product.find({});
    
        res.status(200).json({
          status: "success",
          results: data.length,
          data,
        });
      } catch (err) {
        res.status(400).json({
          status: "fail",
          message: err,
        });
        console.error("Get error for get all products function: ", err)
      }
};

// get a single products
export const getProduct = async (req: Request, res: Response) => {
    try {
      const data = await Product.findById(req.params.id);
        
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
      console.error("Get error for get product function: ", err)
    }
  };

  // get all products that matches the userID
export const getUserProducts = async (req: Request, res: Response) => {
    try {
        const data = await Product.find({userID: req.params});
    
        res.status(200).json({
          status: "success",
          results: data.length,
          data,
        });
      } catch (err) {
        res.status(400).json({
          status: "fail",
          message: err,
        });
        console.error("Get error for get user's products function: ", err)
      }
};

//add product
export const addProduct = async (req: Request, res: Response) => {
    console.log(req.body);
    try {
        const newCar = await Product.create(req.body);
        res.status(201).json({
          status: "success",
          data: {
            car: newCar,
          },
        });
      } catch (err) {
        res.status(400).json({
          status: "fail",
          message: err,
        });
        console.error("Get error for create product function: ", err)
      }
    };

//edit product
export const editProduct = async (req: Request, res: Response)=> {
        try {
            const {userId} = req.params;
            const updatedInfo = req.body;
            const response = await Product.updateOne({_id: userId}, updatedInfo);
            res.status(201).json({
                status: "success",
                updatedInfo: response});
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error,
            })
            console.error("Error catch when calling the edit product function.", error);
        }
    };

// delete a product
export const removeProduct = async (req: Request, res: Response) => {
    try {
      const data = await Product.deleteOne({_id:req.params.id});
      res.status(204).json({
        status: "success",
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
      console.error("Get error for delete product function: ", err)
    }
  };