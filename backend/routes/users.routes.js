import {Router} from 'express';
import { asyncHandler } from "../utils/asynHandler.js";
import * as userController from "../controllers/users.controller.js"

const router = Router();

router.get("/me",  asyncHandler(userController.getMe));

export default router;