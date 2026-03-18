
import {Router} from 'express';
import { asyncHandler } from "../utils/asynHandler.js";
import * as eventController from '../controllers/event.controller.js'

const router = Router();

router.post("/", asyncHandler(eventController.createUpdateEvent));
router.get("/events-with-stats",  asyncHandler(eventController.getEventsWithStats));
router.get("/:id/with-stats",  asyncHandler(eventController.getEventsWithStats));
router.get("/:id/subevents",  asyncHandler(eventController.getSubevents));
router.get("/:id/delete",  asyncHandler(eventController.deleteEvent));


export default router;