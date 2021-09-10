import custom_Error from '../utills/error';
import { Route, Tags, Post, Body } from "tsoa";
import { UserClass } from "../repositories/UserRepository";
import { ILoginRequest } from '../types/Requests/ILoginRequest';
import { ILoginResponse } from '../types/Responses/ILoginResponses';
import jwt, { Secret } from "jsonwebtoken";
require('dotenv').config();

@Route('/')
@Tags('Login')
export class LoginController {
    constructor() { }

    /**
     * User credentials required.
     * Login to get acess token for secured end points
     * @summary "Use username: admin && password: admin@123 for admin login" 
    */

    @Post('/login')
    async login(@Body() user: ILoginRequest): Promise<ILoginResponse> {

        const authuser = await new UserClass().ReturnUser(user);
        if (!authuser)
            throw new custom_Error(401, "User not verified", "Invalid credentials");
        return <ILoginResponse>{
            token_key: jwt.sign(JSON.stringify(authuser), <Secret>process.env.TOKEN_KEY),
            message: "Credentials Approved"
        }
    }
}