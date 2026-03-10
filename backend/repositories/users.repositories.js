import {query} from '../db/query.js';

export async function getMe(IdUser) {
    return query(
      `
      SELECT Users.Id, Users.Pseudo 
      FROM Users
      where Users.Id = @IdUser 
    `, {
        IdUser
    });
}