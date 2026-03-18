
import {query} from '../db/query.js';

import { log } from "../utils/logger.js";
const scope = "subEvent.repositories";

export async function getSubEventByEventId(id) {    
    log(scope, "getSubEventByEventId");
    return query(`
        SELECT  sub_event.id,
                sub_event.event_id,
                sub_event.name,
                sub_event.sub_event_type_id,
                sub_event.start_at                
        FROM  sub_event        
        where sub_event.event_id = $1
        order by sub_event.id
    `,{id});
}

export async function saveSubEvent(eventId, updateSubevent) {
    log(scope, "saveSubEvent");
    const result = await query(`        
            INSERT INTO sub_event (
                name,
                start_at,
                event_id,
                sub_event_type_id,
                created_at,
                created_by,
                updated_at,
                updated_by
            )            
            OUTPUT INSERTED.*
            VALUES (
                $1,                
                $2,
                $3,
                $4,
                NOW(),
                'Admin',
                NOW(),
                'Admin'
            )
        
     `
    ,[      
      updateSubevent.Name,
      updateSubevent.StartAt,
      eventId,
      updateSubevent.SubEventTypeId
    ]);    
  return result[0];
}

export async function deleteById(id) {
    log(scope, "deleteById");
    return await query(`
        DELETE FROM sub_event where id = $1
     `
    ,[ id ]);      
}