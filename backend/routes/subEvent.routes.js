import {Router} from 'express';
import { asyncHandler } from "../utils/asynHandler.js";
import * as authMiddleware from "../middleware/authMiddleware.js"
import * as seController from '../controllers/subEvent.controller.js'

const router = Router();
router.post("/:id/participants", authMiddleware.authMiddleware, asyncHandler(seController.addParticipant))

export default router;