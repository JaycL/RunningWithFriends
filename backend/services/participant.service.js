import { log } from "../utils/logger.js";

import * as participantRep from '../repositories/participant.repositories.js'

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
    return await participantRep.getParticipantsBySubEventId(subeventIds);          
}

export  async function getParticipantsByUsers(userIds) {  
    log(scope,"getParticipantsByUsers");    
    return await participantRep.getParticipantsByUserId(userIds);          
}