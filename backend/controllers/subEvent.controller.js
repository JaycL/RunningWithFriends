import { ApiResponse } from "../utils/ApiReponse.js";
import { ApiError } from "../middleware/ApiError.js";

import * as seService from "../services/subEvent.service.js"

import { log } from "../utils/logger.js";
const scope = "subEvent.controller";

export async function addParticipant (req, res) {
    log(scope,"subeventAddParticipant");    
    const userId = req.user.userId;
    const subeventId = req.params.id;
    const statusId = req.body.participationStatusId;
    
    const Id = await seService.addParticipant(userId, subeventId,statusId);    
    if (Id <= 0) {
        throw new ApiError(404, "Participation failed");
    }
    res
    .status(200)
    .json(new ApiResponse(200,Id,"Participation success"));
};
