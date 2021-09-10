import { Document, Schema } from "mongoose";
import { IMenuItem } from "./IMenu";
export interface IOrderDocument extends Document {
    _id: string | Schema.Types.ObjectId;
    waiter: string | Schema.Types.ObjectId;
    items: Array<ISingleOrderItem>;
    order_table: number;
    order_status: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined
}
export interface IOrder {
    _id: string | any;
    waiter: string | any;
    items: Array<ISingleOrderItem> | any;
    order_table: number;
    order_status: string;
    createdAt?: Date | any;
    updatedAt?: Date | any
}
export interface ISingleOrderItem {
    item: string | IMenuItem;
    quantity: number
}