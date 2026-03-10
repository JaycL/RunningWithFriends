import * as eventRepertories from "../repositories/events.repositories.js"
import * as subeventRepertories from "../repositories/subevents.repositories.js"
import * as raceRepertories from "../repositories/races.repositories.js"
import sql from 'mssql';
import { pool } from "../db/database.js";

export async function getSubEvents(eventId) {
  const rows = await eventRepertories.getSubEvents(eventId);

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
  }
  return Array.from(map.values());
}

export  async function getEventsWithSubEventCount() {  
  return await eventRepertories.getEventsWithSubEventCount();
}



export  async function createUpdateEvent(event) {  

  // -- requete pour verifier que l'event existe 
  console.log("Creation ou ajout ");
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
            console.log("Avant race");
            const rowRace = await raceRepertories.saveRace(rowsub.Id, i, race);
            console.log(rowRace);
            createdSubevent.Races.push(rowRace);
          }             
          createdEvent.subevents.push(createdSubevent);

        }
        console.log("fin ");

    await transaction.commit();
    return createdEvent;    

  }  
  catch (err) {

    await transaction.rollback();
    throw err;
  }
}

export  async function deleteEvent(idEvent) {  
  return await eventRepertories.deleteEvent(idEvent);
}