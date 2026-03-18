
import {query} from '../db/query.js';

import { log } from "../utils/logger.js";
const scope = "event.repositories";

export async function getEventsWithStats(eventId) {    
  log(scope, "getEventsWithStats");
  return query(`
      SELECT 
        e.id,
        e.name,
        e.city,
        e.start_at,
        e.end_at,
        e.is_public,
        COUNT(DISTINCT se.id) AS nbsubevent,
        COUNT(Participant.id) AS nbparticipant
      FROM event e
        LEFT JOIN sub_event se ON se.event_id = e.id
        LEFT JOIN participant ON participant.sub_event_id = se.id
      WHERE ($1::int IS NULL OR e.id = $1)
      GROUP BY e.id, e.name, e.city, e.start_at, e.end_at, e.is_public      
    `
  , [eventId]);
}

export async function saveEvent(updateEvent) {
  log(scope, "saveEvent");      
  const result = await query(`
        IF EXISTS (SELECT 1 FROM event WHERE id = $1)
        BEGIN
            UPDATE event
            SET 
                name = $2,
                city = $3,
                start_at = $4,
                end_at = $5,
                is_public = $6,
                updated_at = NOW(),
                updated_by = 'Admin'
            OUTPUT INSERTED.*
            WHERE id = $1
        END
        ELSE
        BEGIN
            INSERT INTO event (
                name,
                city,
                start_at,
                end_at,
                is_public,
                created_at,
                created_by,
                updated_at,
                updated_by
            )            
            OUTPUT INSERTED.*
            VALUES (
                $2,
                $3,
                $4,
                $5,
                $6,
                NOW(),
                'Admin',
                NOW(),
                'Admin'
            )
        END
     `
    ,[
      updateEvent.Id,
      updateEvent.Name,
      updateEvent.City,
      updateEvent.IsPublic,
      updateEvent.StartAt,
      updateEvent.EndAt
    ]);    
  return result[0];
}


export async function deleteEvent(idEvent) {
  log(scope, "deleteEvent");
    return query(
      'DELETE FROM event WHERE event.id = $1'
    ,{idEvent});
}