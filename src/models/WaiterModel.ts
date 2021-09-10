import { Schema, model } from 'mongoose';
import { IWaiterDocument } from '../types/Documents/IWaiter';
const WaiterSchema = new Schema(
    {
        name: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        },
        address: String
    },
    { timestamps: true }
);
export const WaiterModel = model<IWaiterDocument>('Waiters', WaiterSchema);