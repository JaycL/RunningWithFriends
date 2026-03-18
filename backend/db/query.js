import {pool } from "./database.js";

export async function query(sqlQuery, params = {}) {

   const values = Object.values(params);

    const result = await pool.query(sqlQuery, values);    
    return result.rows;
}

export function arrayToString(ids) {
    if (!ids || ids.length === 0) return "NULL";
    
    return ids
            .map(v => Number(v))
            .filter(v => !isNaN(v))
            .join(",");
}