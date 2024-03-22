import Post from "../models/post";
import {Request, Response} from "express";

// get all posts
export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const data = await Post.find({});
    
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
        console.error("Get error for get all posts function: ", err)
      }
};

  // get all posts that matches the userID
export const getUserposts = async (req: Request, res: Response) => {
    try {
        const data = await Post.find({userID: req.params.userID});
    
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
        console.error("Get error for get user's posts function: ", err)
      }
};

//add post
export const addpost = async (req: Request, res: Response) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json({
          status: "success",
          data: {
            post: newPost,
          },
        });
      } catch (err) {
        res.status(400).json({
          status: "fail",
          message: err,
        });
        console.error("Get error for create post function: ", err)
      }
    };

//edit post
export const editpost = async (req: Request, res: Response)=> {
        try {
            const updatedInfo = req.body;
            const response = await Post.updateOne({_id: req.params.postId}, updatedInfo);
            res.status(201).json({
                status: "success",
                updatedInfo: response});
        } catch (error) {
            res.status(400).json({
                status: "fail",
                message: error,
            })
            console.error("Error catch when calling the edit post function.", error);
        }
    };

// delete a post
export const removepost = async (req: Request, res: Response) => {
    try {
      const data = await Post.deleteOne({_id:req.params.postId});
      res.status(204).json({
        status: "success",
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
      console.error("Get error for delete post function: ", err)
    }
  };