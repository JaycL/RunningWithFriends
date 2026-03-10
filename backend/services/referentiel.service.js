import * as repertories from "../repositories/referentiel.repositories.js"

export async function getReferentiel(eventId) {
    const [raceTypes, subeventTypes, distanceTypes] = await Promise.all([
        repertories.getRaceTypes(),
        repertories.getSubeventTypes(),
        repertories.getDistanceType()
    ]);
  return {
    raceTypes,
    subeventTypes,
    distanceTypes
  };
}
