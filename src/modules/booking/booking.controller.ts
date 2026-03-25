import { Request, Response } from "express";
import * as bookingService from "./booking.service";
import { HTTP_STATUS } from "../../utils/httpStatus";
import { sendSuccess } from "src/utils/response";
import {
  BookingSchema,
  checkInSchema,
  checkOutSchema,
  dailyUpdateSchema,
} from "./booking.schema";
import { id } from "zod/v4/locales";

export const create = async (req: Request, res: Response) => {
  const validatedData = BookingSchema.parse(req.body);

  const booking = await bookingService.processNewBooking(
    validatedData,
    req.user!.id,
  );

  return sendSuccess(
    res,
    "Booking berhasil diajukan",
    booking,
    HTTP_STATUS.CREATED,
  );
};

export const list = async (req: Request, res: Response) => {
  const bookings = await bookingService.getUserBookingHistory(req.user!.id);

  return sendSuccess(
    res,
    "Daftar booking berhasil diambil",
    bookings,
    HTTP_STATUS.OK,
  );
};

export const checkIn = async (req: Request, res: Response) => {
  const { params } = checkInSchema.parse(req.params);
  const result = await bookingService.confirmCheckIn(params.id);
  return sendSuccess(
    res,
    "Kucing telah diterima dan status menjadi IN_CARE",
    result,
    HTTP_STATUS.OK,
  );
};

export const updateMonitoring = async (req: Request, res: Response) => {
  const { params, body } = dailyUpdateSchema.parse({
    params: req.params,
    body: req.body,
  });

  const result = await bookingService.addDailyUpdate({ params, body });
  return sendSuccess(
    res,
    "Catatan harian berhasil ditambahkan",
    result,
    HTTP_STATUS.CREATED,
  );
};

export const checkOut = async (req: Request, res: Response) => {
  const { params } = checkOutSchema.parse(req.params);
  const result = await bookingService.completeBooking(params.id);

  return sendSuccess(
    res,
    "Penitipan selesai. Kandang telah dikosongkan dan data masuk ke riwayat.",
    result,
    HTTP_STATUS.OK,
  );
};

export const getHistoryBooking = async (req: Request, res: Response) => {
  const { params } = checkOutSchema.parse(req.params);
  const result = await bookingService.getHistoryBooking(params.id);
  return sendSuccess(
    res,
    "Riwayat booking berhasil diambil",
    result,
    HTTP_STATUS.OK,
  );
};
