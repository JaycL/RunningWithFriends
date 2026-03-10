import * as usersService from "../services/users.service.js"
import { ApiResponse } from "../utils/ApiReponse.js";

export async function getMe (req, res) {
    
    const IdUser = req.params.Id;

    const me = await usersService.getMe(IdUser);
    if (!me) {
        throw new ApiError(404, "user not found");
    }
    res
    .status(200)
    .json(new ApiResponse(200,me,"liste of events"));
};