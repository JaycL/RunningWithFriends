import { Router } from "express";
import { asyncHandler } from "../utils/asynHandler.js";

import eventRoutes from './event.routes.js'
import usersRoutes from './user.routes.js'

import subEventRoutes from './subevent.routes.js'

import * as referentielController from '../controllers/referentiel.controller.js'

const router = Router();

router.use("/events", eventRoutes);
router.use("/users", usersRoutes);
router.use("/subevents", subEventRoutes);

router.get("/referentiel", asyncHandler(referentielController.getReferentiel));


export default router;


