import { getTotals } from "src/utils/getTotals";
import * as bookingRepository from "./booking.repository";
import { CreateBookingInput } from "./booking.schema";

export const processNewBooking = async (
  data: CreateBookingInput,
  userId: string,
) => {
  const booking = await bookingRepository.getBookingsByUser(userId);
  console.log("Existing bookings for user:", booking);

  if (
    booking.status === "PENDING" ||
    booking.status === "CONFIRMED" ||
    booking.status === "IN_CARE"
  ) {
    throw new Error("Anda sudah memiliki booking yang sedang diproses");
  }

  const totalPrice = getTotals(data);
  return await bookingRepository.createBooking(userId, data, totalPrice);
};

export const getUserBookingHistory = async (userId: string) => {
  return await bookingRepository.getBookingsByUser(userId);
};
