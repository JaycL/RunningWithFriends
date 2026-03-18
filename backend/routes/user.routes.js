import { Router } from 'express';
import { asyncHandler } from "../utils/asynHandler.js";
import * as userController from "../controllers/user.controller.js"
import * as authMiddleware from "../middleware/authMiddleware.js"

const router = Router();

router.get("/", authMiddleware.authMiddleware, asyncHandler(userController.getMe));
router.get("/me", authMiddleware.authMiddleware, asyncHandler(userController.getMe));
router.post("/auth",  asyncHandler(userController.login));

export default router;