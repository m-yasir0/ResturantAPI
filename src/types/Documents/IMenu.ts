import { Document, Schema } from "mongoose";
export interface IMenuItemDocument extends Document {
    _id: string | Schema.Types.ObjectId;
    item_name: string;
    type: string;
    size: string;
    price: number;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined
}
export interface IMenuItem {
    _id: string | any;
    item_name: string;
    type: string;
    size: string;
    price: number;
    createdAt?: Date | any;
    updatedAt?: Date | any
}