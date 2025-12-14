import * as express from "express";
import { getAllPosts } from "../controllers/post.controllers";
import { authMiddleware } from "../middleware/authMiddleware";


const router = express.Router()

router.get("/allPost", authMiddleware, getAllPosts);

export default router