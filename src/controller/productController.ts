import mongoose from "mongoose";
import Product from "../models/product";
import {Request, Response} from "express";

// get all products
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const data = await Product.find({}).populate("userID category");
    
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
      const data = await Product.findById(req.params.productID).populate("userID category");
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
        const data = await Product.find({userID: req.params.userID}).populate("userID category");
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
  console.log(req.body.category)
    try {
      const categoryObjectID = mongoose.Types.ObjectId.createFromHexString(req.body.category);
      const userObjectID= mongoose.Types.ObjectId.createFromHexString(req.body.userID);
        const newProduct = await Product.create({
          image: req.body.image,
          name: req.body.name,
          description: req.body.description,
          category: categoryObjectID,
          price: req.body.price,
          userID: userObjectID
        });
        res.status(201).json({
          status: "success",
          data: {
            product: newProduct,
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
            const updatedInfo = req.body;
            const response = await Product.updateOne({_id: req.params.productID}, updatedInfo);
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
      const data = await Product.deleteOne({_id:req.params.productID});
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

  // get product by category
  export const getProductByCategory = async (req: Request, res: Response) => {
    try {
      const categoryID = req.params.categoryID;
      const objectID = mongoose.Types.ObjectId.createFromHexString(categoryID);
      const data = await Product.find({category: objectID}).populate("userID category");
      res.status(200).json({
        status: "success",
        data,
      });

    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
      console.error("Get error for get product by category function: ", err)
    }
  }
