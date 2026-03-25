import prisma from "src/config/prisma";
import * as paymentRepo from "./payment.repository";
import { StatusPayment, UserPaymentDTO } from "./payment.schema";
import { AppError } from "src/middlewares/error.middleware";
import { HTTP_STATUS } from "src/utils/httpStatus";

export const verifyAdminPayment = async (
  paymentId: string,
  status: (typeof StatusPayment)[number],
) => {
  const payment = await paymentRepo.updateStatus(paymentId, status);

  if (status === "SUCCESS") {
    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { status: "IN_CARE" },
    });

    if (payment.booking.cageId) {
      await prisma.cage.update({
        where: { id: payment.booking.cageId },
        data: { status: "OCCUPIED" },
      });
    }
  } else {
    await prisma.booking.update({
      where: { id: payment.bookingId },
      data: { status: "CANCELLED" },
    });
  }

  return payment;
};

export const createUserPayment = async (data: UserPaymentDTO) => {
  const booking = await prisma.booking.findUnique({
    where: { id: data.bookingId },
  });

  if (!booking)
    throw new AppError("Booking tidak ditemukan", HTTP_STATUS.NOT_FOUND);

  if (booking.status === "CANCELLED" || booking.status === "COMPLETED") {
    throw new AppError("Booking sudah tidak aktif", HTTP_STATUS.BAD_REQUEST);
  }

  return await paymentRepo.upsertPayment({
    ...data,
    amount: booking.totalPrice,
  });
};
