import prisma from "src/config/prisma";
import { CageDTO, CageType, UpdateCageDTO } from "./cage.schema";

export const getAllCages = async () => {
  return await prisma.cage.findMany({
    orderBy: { cageNumber: "asc" },
  });
};

export const createCage = async (data: CageDTO) => {
  return await prisma.cage.create({ data });
};

export const updateCage = async (id: string, data: UpdateCageDTO) => {
  return await prisma.cage.update({
    where: { id },
    data,
  });
};

export const findById = async (id: string) => {
  return await prisma.cage.findUnique({
    where: { id },
  });
};

export const findAvailableCagesByTypeAndDate = async (
  type: (typeof CageType)[number],
  startDate: Date,
  endDate: Date,
) => {
  return await prisma.cage.findMany({
    where: {
      type,
      status: "AVAILABLE",
      booking: {
        none: {
          AND: [
            {
              checkInDate: {
                lte: endDate,
              },
              checkOutDate: {
                gte: startDate,
              },
            },
            {
              status: {
                in: ["PENDING", "CONFIRMED", "IN_CARE"],
              },
            },
          ],
        },
      },
    },
  });
};
