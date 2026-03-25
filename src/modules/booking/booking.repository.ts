import prisma from "src/config/prisma";
import { CreateBookingInput, DailyUpdateInput } from "./booking.schema";

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

export const updateToCheckIn = async (id: string) => {
  return await prisma.booking.update({
    where: { id },
    data: { status: "IN_CARE" },
  });
};

export const createDailyLog = async (data: DailyUpdateInput) => {
  return await prisma.dailyLog.create({
    data: {
      bookingId: data.params.id,
      ...data.body,
    },
  });
};

export const getBookingByIdWithPayment = async (bookingId: string) => {
  return await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { payment: true },
  });
};

export const processCheckOut = async (bookingId: string, cageId: string) => {
  return await prisma.$transaction([
    prisma.booking.update({
      where: { id: bookingId },
      data: { status: "COMPLETED" },
    }),

    prisma.cage.update({
      where: { id: cageId },
      data: {
        status: "AVAILABLE",
        currentBookingId: null,
      },
    }),
  ]);
};

export const getBookingById = async (bookingId: string) => {
  return await prisma.booking.findUnique({
    where: { id: bookingId },
  });
}

export const getUserHistory = async (userId: string) => {
  return await prisma.booking.findMany({
    where: {
      userId,
      status: "COMPLETED", 
    },
    include: {
      cat: true,
      payment: true,
      dailyLogs: true, 
    },
    orderBy: { updatedAt: "desc" },
  });
};