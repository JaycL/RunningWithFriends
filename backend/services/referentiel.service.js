import { mapRefWithAbrDTO, mapRefWithDescDTO } from "../mappers/referentiel.mapper.js";
import * as repertories from "../repositories/referentiel.repositories.js"
import { hasRows } from "../utils/db.utils.js";

import { log } from "../utils/logger.js";
const scope = "referentiel.service";


export async function getReferentiel(eventId) {
  log(scope,"getReferentiel")
  const [raceTypes, subeventTypes, distanceUnits, participationStatus] = await Promise.all([
        repertories.getRaceTypes() || [],
        repertories.getSubeventTypes() || [],
        repertories.getDistanceUnits() || [],
        repertories.getParticipationStatus() || []
    ]);
  return {
    raceTypes: raceTypes.map(mapRefWithDescDTO),
    subeventTypes: subeventTypes.map(mapRefWithDescDTO),
    distanceUnits: distanceUnits.map(mapRefWithAbrDTO),
    participationStatus: participationStatus.map(mapRefWithAbrDTO)
  };
}

