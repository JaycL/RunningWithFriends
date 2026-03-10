import * as authRepositories from '../repositories/auth.repositories.js'

export  async function login(email , pass) {  
  const row = await authRepositories.login(email , pass);
  return (row.length <= 0 ? '' : row[0].Id)    
}

