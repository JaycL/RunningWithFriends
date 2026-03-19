import { log } from "../utils/logger.js";

import * as seRep from '../repositories/subEvent.repositories.js'

import * as raceService from './race.service.js'
import * as participantService from './participant.service.js'
import { mapSubEventDTO, mapSubEventRow } from "../mappers/subEvent.mapper.js";
import { hasRows } from "../utils/db.utils.js";


const scope = "subEvent.service";

export async function getSubEvents(eventId) {
  log(scope,"getSubEvents");    

  /* récuperation des sub event */
  const rows = await seRep.getSubEventByEventId(eventId);
    
  if (!hasRows(rows)) {
    return [];
  }

  const subevents = rows.map(mapSubEventRow).map(mapSubEventDTO);
  
  const ids = subevents.map(se => se.Id);

  console.log("--subevents");  
  console.log(subevents);
  console.log("Liste Id:"+ids);
  console.log("-- Fin - subevents");  
  
  /* récuperation des races & participants */  
  const allRaces = await raceService.getBySubEventId(ids);
  const allParticipants = await participantService.getParticipantsBySubEvents(ids);
  
  for (const se of subevents) {   
    se.Races = allRaces.filter(r => r.SubEventId === se.Id);
    se.Participants = allParticipants.filter(p => p.SubEventId === se.Id);
  }  
  console.log(subevents)
  return subevents;
}

export  async function addParticipant(userId, subeventId, statusId) {  
  log(scope,"subeventAddParticipant");    
  return await participantService.addParticipant(userId, subeventId, statusId);     
}
