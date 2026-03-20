import { Request, Response } from "express";
import * as bookingService from "./booking.service";
import { HTTP_STATUS } from "../../utils/httpStatus";
import { sendSuccess } from "src/utils/response";
import { BookingSchema } from "./booking.schema";

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
