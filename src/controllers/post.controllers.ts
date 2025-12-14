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