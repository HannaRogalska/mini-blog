import type { Request, Response } from "express";
import Post from "../models/post/PostModel";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const posts = await Post.find({ author: req.user.id });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is required" });
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const post = await Post.findOne({ _id: id, author: req.user.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    console.log(content);
    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const file = req.file ? req.file.filename : undefined;
    const newPost = await Post.create({
      title,
      content,
      image: file,
      author: req.user.id,
    });
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
export const deletePost = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Id is required" });
    const post = await Post.findOneAndDelete({ _id: id, author: req.user.id });
    if (!post) return res.status(404).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
