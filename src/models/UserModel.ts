import { Schema, model } from 'mongoose';
import { IUserDocument } from '../types/Documents/IUser';
const UserSchema = new Schema(
    {
        user_name: {
            type: String,
            unique: true
        },
        password: String,
        type: {
            type: String,
            enum: ["admin", "waiter"]
        },
        roles: [String]
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.createdAt;
                delete ret.updatedAt;
                delete ret.__v;

            }
        }
    }
);
export const UserModel = model<IUserDocument>('Users', UserSchema);