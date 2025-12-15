import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/user/UserModel";


export const authMiddleware = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
          return res.status(401).json({ message: "No access token" });

        const token = authHeader.split(" ")[1];
        if (!token)
          return res.status(401).json({ message: "Invalid access token" });
        const secret = process.env.ACCESS_SECRET;
        if (!secret) return res.status(404).json({ message: "Secret not found" });
        const decoded = jwt.verify(
          token,
            secret)
        if (!decoded || typeof decoded === "string") {
          return res.status(403).json({ message: "Invalid token payload" });
        }

        const user = await User.findById(decoded.id);
        if(!user) return res.status(403).json({ message: "User not found" });

        
        req.user = {
          id: user._id.toString(),
          email: user.email,
        };

        next();
      } catch (error) {
         return res.status(403).json({ message: "Invalid token" });
      }
}