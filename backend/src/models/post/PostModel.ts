import { Schema, model, Types } from "mongoose";
import type { IPost } from "./postType";

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Post = model<IPost>("Post", postSchema);
export default Post;