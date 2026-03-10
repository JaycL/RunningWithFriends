
import {query} from '../db/query.js';

export async function getEvents() {
    return query(
      'SELECT * FROM Events'
    );
}

export async function getEventsWithSubEventCount() {    
    return query(`
      SELECT 
        e.Id,
        e.Name,
        e.City,
        e.StartAt,
        e.EndAt,
        e.IsPublic,
        COUNT(se.Id) AS NbSubEvents
      FROM Events e
        LEFT JOIN SubEvents se ON se.EventId = e.Id
      GROUP BY e.Id, e.Name, e.City, e.StartAt, e.EndAt, e.IsPublic      
    `);
}

export async function getSubEvents(id) {    
    return query(`
        SELECT  SubEvents.Id as SubEventId,
                SubEvents.Name,
                SubEvents.SubeventTypeId,
                SubEvents.StartAt,
                Races.Id as RaceId,
                Races.RaceOrder,
                Races.RaceTypeId,
                Races.Distance,
                Races.DistanceTypeId
        FROM  SubEvents
        left join Races ON Races.SubEventId = SubEvents.id
        where SubEvents.EventId = @id
        order by SubEvents.Id, Races.RaceOrder
    `,{id});
}

export async function getEventById(idEvent) {
    return query(
      'SELECT * FROM Events WHERE Events.Id = @idEvent'
    ,{idEvent});
}

export async function saveEvent(updateEvent) {
    const result = await query(`
        IF EXISTS (SELECT 1 FROM Events WHERE Id = @Id)
        BEGIN
            UPDATE Events
            SET 
                Name = @Name,
                City = @City,
                StartAt = @StartAt,
                EndAt = @EndAt,
                isPublic = @IsPublic,
                UpdatedAt = GETDATE(),
                UpdatedBy = 'Admin'
            OUTPUT INSERTED.*
            WHERE Id = @Id
        END
        ELSE
        BEGIN
            INSERT INTO Events (
                Name,
                City,
                StartAt,
                EndAt,
                isPublic,
                CreatedAt,
                CreatedBy,
                UpdatedAt,
                UpdatedBy
            )            
            OUTPUT INSERTED.*
            VALUES (
                @Name,
                @City,
                @StartAt,
                @EndAt,
                @IsPublic,
                GETDATE(),
                'Admin',
                GETDATE(),
                'Admin'
            )
        END
     `
    ,{
      Id: updateEvent.Id,
      Name: updateEvent.Name,
      City: updateEvent.City,
      IsPublic: updateEvent.IsPublic,
      StartAt: updateEvent.StartAt,
      EndAt: updateEvent.EndAt
    });    
  return result[0];
}


export async function deleteEvent(idEvent) {
    return query(
      'DELETE FROM Events WHERE Events.Id = @idEvent'
    ,{idEvent});
}