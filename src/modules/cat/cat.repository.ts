import prisma from "../../config/prisma";
import { CatDTO } from "./cat.dto";

export const findCatByNameAndOwnerId = async (
  name: string,
  ownerId: string,
) => {
  return await prisma.cat.findFirst({
    where: {
      name,
      ownerId,
    },
  });
};

export const createCat = async (data: CatDTO, ownerId: string) => {
  return await prisma.cat.create({
    data: {
      ...data,
      ownerId,
    },
  });
};

export const findAllCatsByOwnerId = async (ownerId: string) => {
  return await prisma.cat.findMany({
    where: {
      ownerId,
    },
  });
};

export const findCatByIdAndOwnerId = async (id: string, ownerId: string) => {
  return await prisma.cat.findFirst({
    where: {
      id,
      ownerId,
    },
  });
};

export const updateCat = async (id: string, data: CatDTO) => {
  return await prisma.cat.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });
};

export const deleteCat = async (id: string, ownerId: string) => {
  await prisma.cat.delete({
    where: {
      id,
      ownerId,
    },
  });
};
