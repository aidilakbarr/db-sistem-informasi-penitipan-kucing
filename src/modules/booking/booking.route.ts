import { Router } from "express";
import * as bookingController from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.use(authMiddleware);

router.post("/bookings", asyncHandler(bookingController.create));
router.get("/bookings", asyncHandler(bookingController.list));
router.put("/bookings/:id/check-in", asyncHandler(bookingController.checkIn));
router.put("/bookings/:id/check-out", asyncHandler(bookingController.checkOut));
router.post(
  "/bookings/:id/daily-update",
  asyncHandler(bookingController.updateMonitoring),
);
router.get(
  "/bookings/:id/history",
  asyncHandler(bookingController.getHistoryBooking),
);

export default router;
