import { Router } from "express";
import * as bookingController from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.use(authMiddleware);

router.post("/bookings", asyncHandler(bookingController.create));
router.get("/bookings", asyncHandler(bookingController.list));

export default router;
