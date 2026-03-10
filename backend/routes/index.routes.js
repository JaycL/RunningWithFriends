import { Router } from "express";
import { asyncHandler } from "../utils/asynHandler.js";
import eventsRoutes from "./events.routes.js";
import usersRoutes from './users.routes.js'

import * as referentielController from '../controllers/referentiel.controller.js'
import * as authController from '../controllers/auth.controller.js'

const router = Router();

router.use("/events", eventsRoutes);
router.use("/users", usersRoutes);

router.get("/referentiel", asyncHandler(referentielController.getReferentiel));
router.post("/auth", asyncHandler(authController.login));

export default router;


