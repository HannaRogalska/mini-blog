import * as jwt from "jsonwebtoken";
export const accessToken = (payload: object) => {
  const secret = process.env.ACCESS_SECRET;
  if (!secret) throw new Error("ACCESS_SECRET is not defined");
  return jwt.sign(payload, secret, {
    expiresIn: "15m",
  });
};
export const refreshToken = (payload: object) => {
  const secret = process.env.REFRESH_SECRET;
  if (!secret) throw new Error("ACCESS_SECRET is not defined");
  return jwt.sign(payload, secret, {
    expiresIn: "30d",
  });
};
