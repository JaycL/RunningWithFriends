import {query} from '../db/query.js';

import { log } from "../utils/logger.js";
const scope = "user.repositories";

export async function getUserById(IdUser) {    
    log(scope,"getUserById");
    return query(
      `
      SELECT    id, 
                pseudo, 
                email
      FROM  app_user
      where id = $1 
    `, [ IdUser ]);
}

export async function getUserByLogin(email) {
    log(scope,"getUserByLogin");
    return query(
      `
      SELECT    id, 
                password 
      FROM  app_user
      where Email = $1 
    `, [ email ]);
}