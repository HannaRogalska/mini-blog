import * as bcrypt from "bcryptjs";
import type { IUser } from "../models/user/userType";
import  User from "../models/user/UserModel";
import type { Request, Response } from "express";


export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) res.status(400).json({ message: "Email, name and password required" });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = {
          email,
          name,
          password: hashPassword,
        };
    User.create(newUser);

    } catch (error) {
        
    }
};