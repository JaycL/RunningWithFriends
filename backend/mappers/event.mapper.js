export function mapEvent(row) {
  return {
    Id: row.id,
    Name: row.name,
    City: row.city,
    StartAt: row.start_at,
    EndAt: row.end_at,
    IsPublic: row.is_public,
    CreatedAt: row.created_at ?? null,
    UpdatedAt: row.updated_at ?? null,
    NbSubEvent: row.nbsubevent ?? null,
    NbParticipant: row.nbparticipant ?? null
  };
}