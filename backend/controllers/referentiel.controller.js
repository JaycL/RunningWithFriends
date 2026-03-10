import * as referentielService from "../services/referentiel.service.js"
import { ApiResponse } from "../utils/ApiReponse.js";

export async function getReferentiel (req, res) {
    console.log("getReferentiel");  
    const referentiel = await referentielService.getReferentiel();    

    res
    .status(200)
    .json(new ApiResponse(200,referentiel,"referentiel"));
};
