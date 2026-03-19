export function mapRaceRow(row) {
  return {
    Id: row.id,
    RaceOrder: row.race_order,
    Distance: row.distance,
    SubEventId: row.sub_event_id,
    RaceTypeId: row.race_type_id,
    DistanceUnitId: row.distance_unit_id,
    CreatedAt: row.created_at ?? null,
    CreatedBy: row.created_by ?? null,
    UpdatedAt: row.updated_at ?? null,
    UpdatedBy: row.updated_by ?? null,    
  };
}

export function mapRaceDTO(row) {
  return {
    Id: row.Id,
    RaceOrder: row.RaceOrder,
    Distance: row.Distance,
    SubEventId: row.SubEventId,
    RaceTypeId: row.RaceTypeId,
    DistanceUnitId: row.DistanceUnitId,
  };
}