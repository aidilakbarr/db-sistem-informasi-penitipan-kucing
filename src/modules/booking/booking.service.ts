import { getTotals } from "src/utils/getTotals";
import * as bookingRepository from "./booking.repository";
import * as cageRepository from "../cage/cage.repository";
import {
  CreateBookingInput,
  DailyUpdateInput,
  dailyUpdateSchema,
} from "./booking.schema";
import { AppError } from "src/middlewares/error.middleware";
import { HTTP_STATUS } from "src/utils/httpStatus";

export const processNewBooking = async (
  data: CreateBookingInput,
  userId: string,
) => {
  const bookings = await bookingRepository.getBookingsByUser(userId);

  const hasConflictBooking = bookings.some(
    (b) =>
      ["PENDING", "CONFIRMED", "IN_CARE"].includes(b.status) &&
      b.checkInDate <= data.checkOutDate &&
      b.checkOutDate >= data.checkInDate,
  );

  if (hasConflictBooking) {
    throw new AppError(
      "Anda sudah memiliki booking pada tanggal tersebut",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const availableCages = await cageRepository.findAvailableCagesByTypeAndDate(
    data.serviceType,
    data.checkInDate,
    data.checkOutDate,
  );

  if (availableCages.length === 0) {
    throw new AppError("Tidak ada kandang tersedia", HTTP_STATUS.BAD_REQUEST);
  }

  const selectedCage = availableCages[0];

  const totalPrice = getTotals(data);

  const booking = await bookingRepository.createBooking(
    userId,
    data,
    totalPrice,
  );

  await cageRepository.updateCage(selectedCage.id, {
    status: "OCCUPIED",
    currentBookingId: booking.id,
  });

  return booking;
};

export const getUserBookingHistory = async (userId: string) => {
  return await bookingRepository.getBookingsByUser(userId);
};

export const confirmCheckIn = async (bookingId: string) => {
  const booking = await bookingRepository.getBookingByIdWithPayment(bookingId);

  if (!booking)
    throw new AppError("Booking tidak ditemukan", HTTP_STATUS.NOT_FOUND);

  if (
    booking.payment?.method === "TRANSFER" &&
    booking.payment.status !== "SUCCESS"
  ) {
    throw new AppError(
      "Pembayaran transfer belum diverifikasi",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  return await bookingRepository.updateToCheckIn(bookingId);
};

export const addDailyUpdate = async (data: DailyUpdateInput) => {
  return await bookingRepository.createDailyLog(data);
};

export const completeBooking = async (bookingId: string) => {
  const booking = await bookingRepository.getBookingById(bookingId);

  if (!booking)
    throw new AppError("Data penitipan tidak ditemukan", HTTP_STATUS.NOT_FOUND);
  if (booking.status !== "IN_CARE") {
    throw new AppError(
      "Kucing belum diserahkan atau status tidak valid untuk check-out",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  if (!booking.cageId)
    throw new AppError(
      "Kandang tidak terdaftar untuk booking ini",
      HTTP_STATUS.BAD_REQUEST,
    );

  return await bookingRepository.processCheckOut(bookingId, booking.cageId);
};

export const getHistoryBooking = async (bookingId: string) => {
  return await bookingRepository.getBookingById(bookingId);
};
