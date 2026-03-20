import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import * as authController from "./auth.controller";

const router = Router();

router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refreshToken));
router.post("/logout", asyncHandler(authController.logout));

export default router;
