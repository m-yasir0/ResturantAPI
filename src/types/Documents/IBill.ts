import { Document, Schema } from "mongoose";
import { IOrder, ISingleOrderItem } from "./IOrder";
export interface IBillDocument extends Document {
    _id: string | Schema.Types.ObjectId;
    order_id: Array<IOrder>;
    total_price: number;
    items: Array<ISingleOrderItem>;
    createdAt?: Date | any;
    updatedAt?: Date | any
}