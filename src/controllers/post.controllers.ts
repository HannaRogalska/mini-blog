import type{ Request, Response } from "express"
import Post from "../models/post/PostModel";

export const getAllPosts = async (req: Request, res: Response) => {
     try {
       if (!req.user) return res.status(401).json({ message: "Unauthorized" });
       const posts = await Post.find({ author: req.user.id });
       return res.status(200).json(posts);
     } catch (error) {
       return res.status(500).json({ message: "Server error" });
     }

} 

export const getPost = async (req: Request, res: Response) => { 


}
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, image, user } = req.body;
    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const newPost = await Post.create({
      title,
      content,
      image,
      author: req.user.id,
    });
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
  
  
};