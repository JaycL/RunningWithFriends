export function mapEventRow(row) {
  return {
    Id: row.id,
    Name: row.name,
    City: row.city,
    StartAt: row.start_at,
    EndAt: row.end_at,
    IsPublic: row.is_public,
    CreatedAt: row.created_at ?? null,
    CreatedBy: row.created_by ?? null,
    UpdatedAt: row.updated_at ?? null,
    UpdatedBy: row.updated_by ?? null,
    NbSubEvent: row.nbsubevent ?? null,
    NbParticipant: row.nbparticipant ?? null
  };
}

export function mapEventDTO(row) {
  return {
    Id: row.id,
    Name: row.name,
    City: row.city,
    StartAt: row.start_at,
    EndAt: row.end_at,
    IsPublic: row.is_public,    
    NbSubEvent: row.nbsubevent ?? null,
    NbParticipant: row.nbparticipant ?? null
  };
}