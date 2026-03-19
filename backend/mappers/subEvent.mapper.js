export function mapSubEventRow(row) {    
  return {
    Id: row.id,
    Name: row.name,    
    StartAt: row.start_at,
    EventId: row.event_id,
    SubEventTypeId: row.sub_event_type_id,
    CreatedAt: row.created_at ?? null,
    CreatedBy: row.created_by ?? null,
    UpdatedAt: row.updated_at ?? null,    
    UpdatedBy: row.updated_by ?? null    
  };
}

export function mapSubEventDTO(se) {
  return {
    Id: se.Id,
    Name: se.Name,
    StartAt: se.StartAt,
    EventId: se.EventId,
    SubEventTypeId: se.SubEventTypeId,
    Races: [],
    Participants: []
  };
}