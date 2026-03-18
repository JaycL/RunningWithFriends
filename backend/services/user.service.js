import jwt from 'jsonwebtoken'
import { log } from "../utils/logger.js";

import * as usersRepositories from '../repositories/user.repositories.js'


const scope = "user.service";

export  async function getMe(userId) {  
  log(scope, "getMe");
    console.log("getMe: "+userId);
    const row = await usersRepositories.getUserById(userId);  
    console.log(row);
    if (row.length <= 0)
        return null;
    return row[0];
}


export  async function login(email , pass) {  
  log(scope, "login"); 

  const user = await usersRepositories.getUserByLogin(email);    
  if (!user[0] || user[0].Password !== pass) {
    return {
      success: false,
      message: "Login incorrect"
    }
  }

  const token = jwt.sign(
    { userId: user[0].Id },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    success: true,    
    token    
  };

}
