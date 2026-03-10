import * as usersRepositories from '../repositories/users.repositories.js'

export  async function getMe(IdUser) {  
    return await usersRepositories.getMe(IdUser);  
}

