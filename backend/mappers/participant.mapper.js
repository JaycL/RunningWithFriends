export function mapParticipantRow(row) {
  return {
    Id: row.id,
    UserId: row.user_id,
    SubEventId: row.sub_event_id,
    ParticipationStatusId: row.participation_status_id,  
    Pseudo: row.pseudo || "",  
    CreatedAt: row.created_at ?? null,
    CreatedBy: row.created_by ?? null,
    UpdatedAt: row.updated_at ?? null,
    UpdatedBy: row.updated_by ?? null,    
  };
}

export function mapParticipantDTO(row) {
  return {
    Id: row.Id,
    UserId: row.UserId,
    SubEventId: row.SubEventId,    
    ParticipationStatusId: row.ParticipationStatusId,
    Pseudo: row.Pseudo
  };
}