
import {query} from '../db/query.js';

export async function saveSubevent(eventId, updateSubevent) {
    const result = await query(`
        
            INSERT INTO SubEvents (
                Name,
                StartAt,
                EventId,
                SubeventTypeId,
                CreatedAt,
                CreatedBy,
                UpdatedAt,
                UpdatedBy
            )            
            OUTPUT INSERTED.*
            VALUES (
                @Name,                
                @StartAt,
                @EventId,
                @SubeventTypeId,
                GETDATE(),
                'Admin',
                GETDATE(),
                'Admin'
            )
        
     `
    ,{
      Id: updateSubevent.Id,
      Name: updateSubevent.Name,
      StartAt: updateSubevent.StartAt,
      EventId: eventId,
      SubeventTypeId: updateSubevent.SubeventTypeId
    });    
  return result[0];
}

export async function deleteByEventId(eventId) {
    return await query(`
        DELETE FROM SubEvents where EventId = @eventId
     `
    ,{ eventId });      
}