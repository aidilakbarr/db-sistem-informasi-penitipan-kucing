import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { login, logout, refreshToken, register } from "./auth.controller";

const router = Router();

router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post("/refresh", asyncHandler(refreshToken));
router.post("/logout", asyncHandler(logout));

export default router;
