import * as express from "express";
import * as multer from "multer";
import * as path from "path";

import {
  getAllPosts,
  getPost,
  createPost,
} from "../controllers/post.controllers";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
};
const upload = multer({ storage, fileFilter });

router.get("/", authMiddleware, getAllPosts);
router.get("/:id", authMiddleware, getPost);
router.post("/", authMiddleware, createPost);
export default router
