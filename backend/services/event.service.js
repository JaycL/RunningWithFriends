import sql from 'mssql';

import { pool } from "../db/database.js";
import { log } from "../utils/logger.js";

import * as eventRepertories from "../repositories/event.repositories.js"

import * as seService from './subEvent.service.js'
import { mapEventRow, mapEventDTO } from '../mappers/event.mapper.js';


const scope = "event.service";

export  async function getEventsWithStats(eventId) {  
  log(scope, "getEventsWithStats");  
  const rows = await eventRepertories.getEventsWithStats(eventId);
  if (!rows || !rows.length) {
    return [];
  }
  return rows.map(mapEventDTO);
}

export  async function createUpdateEvent(event) {  
  log(scope, "createUpdateEvent");

  const transaction = new sql.Transaction(pool);
  try {

      await transaction.begin();
        
      const row = await eventRepertories.saveEvent(event);
      

      const createdEvent = {
        ...row,
        subevents: []
      };  

      await subeventRepertories.deleteByEventId(event.Id)
        /* creation des sous event et des races  */
        for (const subevent of event.subEvents) {          
          const rowsub = await subeventRepertories.saveSubevent(row.Id, subevent);
          const createdSubevent = {
            ...rowsub,
            Races: []
          }          
         
          for (const [i, race] of (subevent.Races.entries() || [])) {         
            const rowRace = await raceRepertories.saveRace(rowsub.Id, i, race);         
            createdSubevent.Races.push(rowRace);
          }             
          createdEvent.subevents.push(createdSubevent);

        }        

    await transaction.commit();
    return createdEvent;    

  }  
  catch (err) {

    await transaction.rollback();
    throw err;
  }
}

export  async function getSubEvents(idEvent) {  
  log(scope, "deleteEvent")
  return await seService.getSubEvents(idEvent);
}

export  async function deleteEvent(idEvent) {  
  log(scope, "deleteEvent")
  return await eventRepertories.deleteEvent(idEvent);
}