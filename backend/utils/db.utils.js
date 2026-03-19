export function hasRows(rows) {
  return Array.isArray(rows) && rows.length > 0;
}

export function ensureRows(rows) {
  if (!Array.isArray(rows)) return [];
  if (!rows.length) return [];
  return rows;
}

export function requireRows(rows, message = "Not found") {

  if (!Array.isArray(rows) || !rows.length) {
    throw new Error(message);
  }

  return rows;
}