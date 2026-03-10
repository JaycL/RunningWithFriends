import {query} from '../db/query.js';

export async function login(email, password) {
    return query(
      `
      SELECT Users.Id 
      FROM Users
      where Users.Email = @email and Users.Password = @password
    `, {
        email, password
    });
}