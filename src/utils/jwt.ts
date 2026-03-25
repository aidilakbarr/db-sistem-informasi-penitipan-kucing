import jwt, { SignOptions } from "jsonwebtoken";
import { AppError } from "src/middlewares/error.middleware";
import { HTTP_STATUS } from "./httpStatus";

if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET) {
  throw new AppError(
    "JWT secret is not defined",
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
  );
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
