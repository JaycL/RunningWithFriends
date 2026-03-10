import {sql, pool, poolConnect } from "./database.js";

export async function query(sqlQuery, params = {}) {

    await poolConnect; // très important
    const request = pool.request();

    Object.entries(params).forEach(([key, value]) => {

        if (typeof value === "number") {
            request.input(key, sql.Int, value);
        }
        else if (typeof value === "boolean") {
            request.input(key, sql.Bit, value);
        }
        else {
            request.input(key, sql.NVarChar, value);
        }

    });
    const result = await request.query(sqlQuery);

    return result.recordset;
}
