import { Request, Response } from "express";
import { sendSuccess } from "../../utils/response";
import { HTTP_STATUS } from "../../utils/httpStatus";
import {
  loginService,
  logoutService,
  refreshTokenService,
  registerService,
} from "./auth.service";
import { loginSchema, registerSchema } from "./auth.schema";
import { AppError } from "../../middlewares/error.middleware";
import { verifyRefreshToken } from "../../utils/jwt";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
};

export const register = async (req: Request, res: Response) => {
  const validatedData = registerSchema.parse(req.body);
  const user = await registerService(validatedData);
  return sendSuccess(
    res,
    "User registered successfully",
    user,
    HTTP_STATUS.CREATED,
  );
};

export const login = async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);
  const { accessToken, refreshToken } = await loginService(
    validatedData.email,
    validatedData.password,
  );
  res.cookie("refreshToken", refreshToken, cookieOptions);
  return sendSuccess(res, "Login successful", { accessToken });
};

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    throw new AppError("Refresh token not found", HTTP_STATUS.UNAUTHORIZED);
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshTokenService(refreshToken);

  res.cookie("refreshToken", newRefreshToken, cookieOptions);

  return sendSuccess(res, "Token refreshed successfully", { accessToken });
};

export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  const decoded = verifyRefreshToken(refreshToken) as { id: string };
  if (refreshToken) {
    await logoutService(decoded.id);
  }
  res.clearCookie("refreshToken");

  return sendSuccess(res, "Logout successful", null);
};
