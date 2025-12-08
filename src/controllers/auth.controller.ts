import * as bcrypt from "bcryptjs";
import User from "../models/user/UserModel";
import type { Request, Response } from "express";
import { accessToken, refreshToken } from "../services/tokenService";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name)
      return res
        .status(400)
        .json({ message: "Email, name and password required" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = {
      email,
      name,
      password: hashPassword,
    };
    await User.create(newUser);
    return res.status(200).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    const getUserFromDb = await User.findOne({ email });
    if (!getUserFromDb)
      return res.status(404).json({ message: "User not found" });
    const match = await bcrypt.compare(password, getUserFromDb.password);
    if (!match)
      return res.status(400).json({
        message: "wrong password.",
      });

    const userAccessToken = accessToken({
      id: getUserFromDb._id,
      email: getUserFromDb.email,
    });
    res.json({ accessToken: userAccessToken });
    const userRefreshToken = refreshToken({
      id: getUserFromDb._id,
      email: getUserFromDb.email,
    });
    getUserFromDb.refreshToken = userRefreshToken;
    await getUserFromDb.save();

    res.cookie("refreshToken", userRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {}
};
