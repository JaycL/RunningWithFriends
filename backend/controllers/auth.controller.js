import * as authService from "../services/auth.service.js"
import { ApiResponse } from "../utils/ApiReponse.js";

export async function login (req, res) {    
    const email = req.body.email;
    const pass = req.body.password;

    const statusLogin = await authService.login(email, pass);    
    res
    .status(200)
    .json(new ApiResponse(200,statusLogin,"liste of events"));
};