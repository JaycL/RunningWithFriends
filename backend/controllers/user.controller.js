import * as usersService from "../services/user.service.js"
import { ApiResponse } from "../utils/ApiReponse.js";
import { ApiError } from "../middleware/ApiError.js";

import { log } from "../utils/logger.js";
const scope = "user.controller";

export async function getMe (req, res) {
    log(scope,"getMe");
    const userId = req.user.userId;
    console.log(req.user);
    console.log(userId);

    const me = await usersService.getMe(userId);
    if (!me) {
        throw new ApiError(404, "user not found");
    }
    res
    .status(200)
    .json(new ApiResponse(200,me,"liste of events"));
};

export async function login (req, res) {    
    log(scope,"login");
    const email = req.body.email;
    const pass = req.body.password;

    const statusLogin = await usersService.login(email, pass);    
    console.log(statusLogin);
    res
    .status(200)
    .json(new ApiResponse(200,statusLogin,"login"));
};