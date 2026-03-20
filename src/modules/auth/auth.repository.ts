import prisma from "../../config/prisma";
import { CreateUserDTO, LoginDTO } from "./auth.dto";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: CreateUserDTO) => {
  return await prisma.user.create({
    data,
  });
};

export const loginUser = async (data: LoginDTO) => {
  return await prisma.user.findUnique({
    where: { email: data.email },
  });
};

export const updateUserRefreshToken = async (
  userId: string,
  refreshTokenHash?: string,
) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { refreshTokenHash },
  });
};
export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
  });
};
