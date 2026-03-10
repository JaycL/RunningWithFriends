
import {Router} from 'express';
import { asyncHandler } from "../utils/asynHandler.js";
import * as eventController from "../controllers/events.controller.js"

const router = Router();

router.post("/", asyncHandler(eventController.createUpdateEvent));
router.get("/",  asyncHandler(eventController.getEvents));
router.get("/events-with-subevent-count",  asyncHandler(eventController.getEventsWithSubEventCount));
router.get("/:id/subevents",  asyncHandler(eventController.getSubevents));
router.get("/:id/delete",  asyncHandler(eventController.deleteEvent));


export default router;