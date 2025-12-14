import * as express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  deletePost
} from "../controllers/post.controllers";
import { authMiddleware } from "../middleware/authMiddleware";


const router = express.Router()

router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getPost);
router.post("/", authMiddleware, createPost);
router.delete("/:id", authMiddleware, deletePost);
export default router