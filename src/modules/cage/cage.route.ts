import { Router } from "express";
import * as cageController from "./cage.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.use(authMiddleware);

router.get("/cages", asyncHandler(cageController.getAll));
router.post("/cages", asyncHandler(cageController.create));
router.patch("/cages/:id/status", asyncHandler(cageController.update));

export default router;
