import prisma from "src/config/prisma";
import { StatusPayment, UserPaymentDTO } from "./payment.schema";

export const updateStatus = async (
  paymentId: string,
  status: (typeof StatusPayment)[number],
) => {
  return await prisma.payment.update({
    where: { id: paymentId },
    data: { status },
    include: {
      booking: true,
    },
  });
};

export const findById = async (id: string) => {
  return await prisma.payment.findUnique({
    where: { id },
    include: { booking: true },
  });
};

export const upsertPayment = async (data: UserPaymentDTO) => {
  return await prisma.payment.upsert({
    where: { bookingId: data.bookingId },
    update: {
      amount: data.amount,
      method: data.method,
      proofOfPayment: data.proofOfPayment,
      status: "PENDING",
    },
    create: {
      bookingId: data.bookingId,
      amount: data.amount,
      method: data.method,
      proofOfPayment: data.proofOfPayment,
      status: "PENDING",
    },
  });
};
