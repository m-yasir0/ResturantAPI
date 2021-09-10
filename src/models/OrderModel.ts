import { Schema, model } from 'mongoose';
import { IOrderDocument } from '../types/Documents/IOrder';
const OrderSchema = new Schema(
    {
        waiter: {
            type: Schema.Types.ObjectId,
            ref: "Waiters"
        },
        items: [{
            item: {
                type: Schema.Types.ObjectId,
                ref: "Menu_Items"
            },
            quantity: Number
        }],
        order_table: Number,
        order_status: {
            type: String,
            enum: ["in_queue", "waiting", "completed"]
        }
    },
    { timestamps: true }
);
export const OrderModel = model<IOrderDocument>('Orders', OrderSchema);