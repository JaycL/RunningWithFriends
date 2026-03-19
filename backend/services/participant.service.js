import { log } from "../utils/logger.js";

import * as participantRep from '../repositories/participant.repositories.js'
import { hasRows } from "../utils/db.utils.js";
import { mapParticipantDTO, mapParticipantRow } from "../mappers/participant.mapper.js";

const scope = "participant.service";

export  async function addParticipant(userId, subeventId, statusId) {  
    log(scope,"addParticipant");        
    const row = await participantRep.participantUpdate(userId, subeventId, statusId);      
    if (row?.Id <= 0)
        return 0
    return row.Id
}

export  async function getParticipantsBySubEvents(subeventIds) {  
    log(scope,"getParticipantsBySubEvents");    
    const rows = await participantRep.getParticipantsBySubEventId(subeventIds);     
    if (!hasRows(rows))
        return [];
    return rows.map(mapParticipantRow).map(mapParticipantDTO);
}

export  async function getParticipantsByUsers(userIds) {  
    log(scope,"getParticipantsByUsers");    
    const rows = await participantRep.getParticipantsByUserId(userIds);          
    if (!hasRows(rows))
        return [];
    return rows.map(mapParticipantRow).map(mapParticipantDTO);
}