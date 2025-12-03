import mongoose from "mongoose";
import type { UrlSettings } from "./db_types";

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_DB;

  if (!mongoUri) throw new Error("MONGODB_URI not found in .env");

  const urlType: UrlSettings = { url: mongoUri };

  try {
    await mongoose.connect(urlType.url);
    console.log("✅ MongoDB connected via Mongoose");
  } catch (err) {
    console.log(`❌ MongoDB connection failed: ${err}`);
    process.exit(1);
  }
};
