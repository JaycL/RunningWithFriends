export function mapSubEvent(row) {
  return {
    Id: row.id,
    Name: row.name,    
    StartAt: row.start_at,
    EventId: row.event_id,
    SubEventTypeId: row.sub_event_type_id,
    CreatedAt: row.created_at ?? null,
    UpdatedAt: row.updated_at ?? null,
    NbSubEvent: row.nbsubevent ?? null,
    NbParticipant: row.nbparticipant ?? null
  };
}