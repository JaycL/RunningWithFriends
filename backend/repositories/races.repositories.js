import {query} from '../db/query.js';

export async function saveRace(subeventId, order, updateRace) {
    const result = await query(`
            INSERT INTO Races (
                RaceOrder,
                Distance,
                DistanceTypeId,
                SubEventId,
                RaceTypeId,
                CreatedAt,
                CreatedBy,
                UpdatedAt,
                UpdatedBy
            )            
            OUTPUT INSERTED.*
            VALUES (
                @RaceOrder,                
                @Distance,
                @DistanceTypeId,
                @SubeventId,
                @RaceTypeId,
                GETDATE(),
                'Admin',
                GETDATE(),
                'Admin'
            )
     `
    ,{
      SubEventId: subeventId,  
      RaceOrder: order,
      Id: updateRace.Id,
      Distance: updateRace.Distance,
      DistanceTypeId: updateRace.DistanceTypeId,
      RaceTypeId: updateRace.RaceTypeId,      
    });    
  return result[0];
}

export async function deleteRaceBySubeventId(subeventId) {
    return await query(`
        DELETE FROM Races where SubEventId = @subeventId
     `
    ,{ subeventId });      
}