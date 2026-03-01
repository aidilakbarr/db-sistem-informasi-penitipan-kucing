import jwt, { SignOptions } from "jsonwebtoken";

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new Error("JWT secret is not defined");
}

export const generateAccessToken = (payload: object) =>
  jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn:
      (process.env.JWT_ACCESS_EXPIRES as SignOptions["expiresIn"]) ?? "15m",
  });

export const generateRefreshToken = (payload: object) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn:
      (process.env.JWT_REFRESH_EXPIRES as SignOptions["expiresIn"]) ?? "7d",
  });

export const verifyAccessToken = (token: string) =>
  jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
