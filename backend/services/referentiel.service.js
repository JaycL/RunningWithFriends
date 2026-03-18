import * as repertories from "../repositories/referentiel.repositories.js"

import { log } from "../utils/logger.js";
const scope = "referentiel.service";


export async function getReferentiel(eventId) {
  log(scope,"getReferentiel")
  const [raceTypes, subeventTypes, distanceUnits, participationStatus] = await Promise.all([
        repertories.getRaceTypes(),
        repertories.getSubeventTypes(),
        repertories.getDistanceUnits(),
        repertories.getParticipationStatus()
    ]);
  return {
    raceTypes,
    subeventTypes,
    distanceUnits,
    participationStatus
  };
}
