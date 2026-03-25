import { Router } from "express";
import { authMiddleware } from "src/middlewares/auth.middleware";
import { asyncHandler } from "src/utils/asyncHandler";
import * as paymentController from "./payment.controller";

const router = Router();

router.use(authMiddleware);

router.get(
  "/payments/verify/:paymentId",
  asyncHandler(paymentController.verifyPayment),
);
