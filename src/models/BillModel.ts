import { Schema, model } from 'mongoose';
import { IBillDocument } from '../types/Documents/IBill';
const BillSchema = new Schema(
    {
        total_price: Number,
        order_id: {
            type: Schema.Types.ObjectId,
            ref: "Orders"
        },
        items: [{
            item: {
                type: Schema.Types.ObjectId,
                ref: "Menu_Items"
            },
            quantity: Number
        }],
    },
    { timestamps: true }
);
export const BillModel = model<IBillDocument>('Bills', BillSchema);