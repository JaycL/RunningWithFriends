import * as referentielService from "../services/referentiel.service.js"
import { ApiResponse } from "../utils/ApiReponse.js";

import { log } from "../utils/logger.js";
const scope = "referentiel.controller";

export async function getReferentiel (req, res) {
    log(scope, "getReferentiel");    
    const referentiel = await referentielService.getReferentiel();    

    res
    .status(200)
    .json(new ApiResponse(200,referentiel,"referentiel"));
};
