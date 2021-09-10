import { IUser } from "../Documents/IUser";

export interface IAddWaiterResponse {
    _id: string;
    name: string;
    user: IUser | any;
    address: string;
    createdAt?: Date;
    updatedAt?: Date
}