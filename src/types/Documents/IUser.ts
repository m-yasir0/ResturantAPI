import { Document } from "mongoose"
export interface IUserDocument extends Document {
    _id: string,
    user_name: string,
    password: string,
    type: string,
    roles: string[];
}
export interface IUser {
    _id: string,
    user_name: string,
    password: string,
    type: string,
    roles?: Array<string>;
}