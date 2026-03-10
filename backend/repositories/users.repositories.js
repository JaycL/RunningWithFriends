import {query} from '../db/query.js';

export async function getUserById(IdUser) {
    console.log("IdUser =", IdUser);
    return query(
      `
      SELECT Users.Id, Users.Pseudo, Users.Email
      FROM Users
      where Users.Id = @IdUser 
    `, {
        IdUser
    });
}

export async function getUserByLogin(email) {
    return query(
      `
      SELECT Users.Id, Users.Password 
      FROM Users
      where Users.Email = @email 
    `, {
        email
    });
}