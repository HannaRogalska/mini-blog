import { Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  image?: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
