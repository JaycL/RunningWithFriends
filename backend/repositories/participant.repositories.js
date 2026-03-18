import {query, arrayToString} from '../db/query.js';

import { log } from "../utils/logger.js";
const scope = "participant.repositories";

export async function participantUpdate(userId, subeventId, participationStatusId) {
    log(scope,"participantUpdate")    
    const result = await query(`
        IF EXISTS (SELECT 1 FROM participant WHERE user_id = $1 AND sub_event_id = $2)
        BEGIN
            UPDATE participant
            SET 
                user_id = $1,
                sub_event_id = $2,
                participation_status_id = $3,                
                UpdatedAt = GETDATE(),
                UpdatedBy = 'Admin'
            OUTPUT INSERTED.*
            WHERE UserId = $1 AND sub_event_id = $2
        END
        ELSE
        BEGIN
            INSERT INTO participant (
                user_id,
                sub_event_id,
                participation_status_id,                
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
                GETDATE(),
                'Admin',
                GETDATE(),
                'Admin'
            )
        END
     `
    ,[
      userId,      
      subeventId,
      participationStatusId      
    ]);    
  return result[0];
}

export async function getParticipantsBySubEventId(subeventIds) {    
    log(scope,"getParticipantsBySubEventId")    
    return await query(`
        SELECT  participant.id,
                participant.user_id,
                participant.sub_event_id,
                participant.participation_status_id,
                app_user.pseudo
        FROM participant
        LEFT JOIN app_user ON app_user.id = participant.user_id
        WHERE participant.sub_event_id = ANY($1)
     `,[subeventIds]);      
}

export async function getParticipantsByUserId(userIds) {
    log(scope,"getParticipantsByUserId")
    return await query(`
        SELECT  participant.id,
                participant.user_id,
                participant.sub_event_id,
                participant.participation_status_id,
                app_user.pseudo
        FROM participant
        LEFT JOIN app_user ON app_user.id = participant.user_id
        WHERE participant.sub_event_id = ANY($1)
     `,[userIds]);    
}

