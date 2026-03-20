import { asyncHandler } from "src/utils/asyncHandler";
import router from "../auth/auth.route";
import * as catController from "./cat.controller";
import { authMiddleware } from "src/middlewares/auth.middleware";

router.post("/cats", authMiddleware, asyncHandler(catController.create));
router.get("/cats", authMiddleware, asyncHandler(catController.getAll));
router.put("/cats/:catId", authMiddleware, asyncHandler(catController.update));
router.delete(
  "/cats/:catId",
  authMiddleware,
  asyncHandler(catController.remove),
);

export default router;
