import { Document, Schema } from "mongoose";
import { IUser } from "./IUser";
export interface IWaiterDocument extends Document {
    _id: string | Schema.Types.ObjectId;
    name: string;
    user: string | Schema.Types.ObjectId;
    address: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined
}
export interface IWaiter {
    _id: string | any;
    name: string;
    user: IUser | any;
    address: string;
    createdAt?: Date | any;
    updatedAt?: Date | any
}