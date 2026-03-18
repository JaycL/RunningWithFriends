import { log } from "../utils/logger.js";

import * as seRep from '../repositories/subEvent.repositories.js/index.js'

import * as raceService from './race.service.js'
import * as participantService from './participant.service.js'
import { mapSubEvent } from "../mappers/subEvent.mapper.js";


const scope = "subEvent.service";

export async function getSubEvents(eventId) {
    log(scope,"getSubEvents");    

    /* récuperation des sub event */
    const subEvents = await seRep.getSubEventByEventId(eventId);

    const mapSe = new Map(subEvents.map(mapSubEvent()).map(se => [se.Id, se]));
   
    console.log(mapSe);

    const ids = subEvents.map(se => se.Id);

    /* récuperation des races  */  
    const allRaces = await raceService.getBySubEventId(ids);

    /* récuperation des participants (userSubEvent)  */
    const allParticipants = await participantService.getParticipantsBySubEvents(ids);

  
  for (const se of mapSe.values()) {   
    se.Races = allRaces.filter(r => r.SubEventId === se.Id);
    se.Participants = allParticipants.filter(p => p.SubEventId === se.Id);
  }
  
  return Array.from(mapSe.values());
}

export  async function addParticipant(userId, subeventId, statusId) {  
  log(scope,"subeventAddParticipant");    
  return await participantService.addParticipant(userId, subeventId, statusId);     
}
