import argon2 from "argon2";
import { RegisterDTO } from "./auth.dto";
import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserRefreshToken,
} from "./auth.repository";
import { AppError } from "../../middlewares/error.middleware";
import { HTTP_STATUS } from "../../utils/httpStatus";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";

export const registerService = async (data: RegisterDTO) => {
  const existingUser = await findUserByEmail(data.email);
  if (existingUser) {
    throw new AppError("Email already registered", HTTP_STATUS.CONFLICT);
  }

  const hashedPassword = await argon2.hash(data.password);

  const user = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", HTTP_STATUS.UNAUTHORIZED);
  }

  const payload = {
    id: user.id,
    name: user.name,
    role: user.role,
    tokenVersion: user.tokenVersion,
  };

  const accessToken = await generateAccessToken(payload);
  const refreshToken = await generateRefreshToken(payload);

  const hashedRefreshToken = await argon2.hash(refreshToken);

  await updateUserRefreshToken(user.id, hashedRefreshToken);

  return {
    accessToken,
    refreshToken,
  };
};

export const refreshTokenService = async (token: string) => {
  const decoded = await verifyRefreshToken(token);

  if (!decoded || typeof decoded === "string") {
    throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  const user = await findUserById(decoded.id);

  if (!user || !user.refreshTokenHash) {
    throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  const isTokenValid = await argon2.verify(user.refreshTokenHash, token);
  if (!isTokenValid) {
    throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  if (user.tokenVersion !== decoded.tokenVersion) {
    throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  const payload = {
    id: user.id,
    name: user.name,
    role: user.role,
    tokenVersion: user.tokenVersion,
  };

  const newAccessToken = await generateAccessToken(payload);
  const newRefreshToken = await generateRefreshToken(payload);
  const hashedRefreshToken = await argon2.hash(newRefreshToken);
  await updateUserRefreshToken(user.id, hashedRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export const logoutService = async (userId: string) => {
  await updateUserRefreshToken(userId);
};
