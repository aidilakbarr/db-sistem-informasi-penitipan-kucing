import prisma from "src/config/prisma";
import { CreateBookingInput } from "./booking.schema";

export const createBooking = async (
  userId: string,
  data: CreateBookingInput,
  totalPrice: number,
) => {
  return await prisma.booking.create({
    data: {
      ...data,
      userId,
      totalPrice,
    },
  });
};

export const getBookingsByUser = async (userId: string) => {
  return await prisma.booking.findMany({
    where: { userId },
    include: { cat: true },
  });
};
