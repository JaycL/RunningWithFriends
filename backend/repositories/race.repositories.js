import { query, arrayToString} from '../db/query.js';

import { log } from "../utils/logger.js";
const scope = "race.repositories";


export async function getRaceBySubEventId(ids) {
    log(scope,"getRaceBySubEventId");   
    console.log(ids);         
    return await query(`
        SELECT  id,
                race_order,
                distance,
                distance_unit_id,
                sub_event_id,
                race_type_id
        FROM race 
        WHERE race.sub_event_id = ANY($1)
        ORDER BY race.id, race.race_order
     `, [ids]);      
}

export async function saveRace(subeventId, order, updateRace) {
    log(scope,"saveRace");
    const result = await query(`
            INSERT INTO race (
                race_order,
                distance,
                distance_unit_id,
                sub_event_id,
                race_type_id,
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
                $5,
                GETDATE(),
                'Admin',
                GETDATE(),
                'Admin'
            )
     `
    ,[
        order,
        updateRace.Distance,
        updateRace.DistanceUnitId,
        subeventId,        
        updateRace.RaceTypeId,      
    ]);    
  return result[0];
}
