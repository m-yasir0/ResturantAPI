import { Schema, model } from 'mongoose';
import { IMenuItemDocument } from '../types/Documents/IMenu';
const MenuSchema = new Schema(
    {
        item_name: String,
        type: String,
        size: String,
        price: Number
    },
    { timestamps: true }
);
export const MenuModel = model<IMenuItemDocument>('Menu_Items', MenuSchema);