import { log } from "../utils/logger.js";

import * as raceRep from '../repositories/race.repositories.js'

import * as userSubEvent from './participant.service.js'
import { hasRows } from "../utils/db.utils.js";
import { mapRaceDTO, mapRaceRow } from "../mappers/race.mapper.js";


const scope = "race.service";

export async function getBySubEventId(ids) {
  log(scope,"getRaceBySubEventId")
  console.log(ids);
  const rows = await raceRep.getRaceBySubEventId(ids);
  if (!hasRows(rows))
    return [];
  return rows.map(mapRaceRow).map(mapRaceDTO);
}

export async function saveRace(race) {
    log(scope,"saveRace")    
    const rows = await raceRep.saveRace(race);
    console.log(rows);

/*
  const map = new Map();
  for (const row of rows) {
    
    if (!map.has(row.SubEventId)) {      
      map.set(row.SubEventId, {
        Id: row.SubEventId,
        Name: row.Name,
        Type: row.Type,
        StartAt: row.StartAt,
        SubeventTypeId: row.SubeventTypeId,
        Races: []
      });
    }
    if (row.RaceId) {      
      map.get(row.SubEventId).Races.push({
        Id: row.RaceId,
        Type: row.RaceType,
        Distance: row.Distance,
        DistanceTypeId: row.DistanceTypeId,
        RaceTypeId: row.RaceTypeId,
      });
    }
  }*/
  return rows;
}

