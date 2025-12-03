import { Schema, model } from "mongoose";
import type { IPost } from "./postType";

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
  },
  { timestamps: true }
);
export default model<IPost>("Post", postSchema);