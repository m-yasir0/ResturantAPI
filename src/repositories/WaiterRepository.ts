var ObjectId = require('mongodb').ObjectId;
import { UserClass } from './UserRepository';
import { IUser } from "../types/Documents/IUser";
import { WaiterModel } from '../models/WaiterModel';

//Child class waiter inherits properties from super UserClass

export class WaiterClass extends UserClass {
    constructor() {
        super()
    }

    /**
     * Add new Waiter
     * Save user in user collection
     */
    async AddWatier(body: any) {
        let user: IUser = <IUser>body;
        user['type'] = 'waiter';
        let id = await super.SaveNew(user);
        body['user'] = id;
        return new WaiterModel(body).save();
    }

    /**
     * Get Waiter id based on user _id from session
     */
    async GetWaiterId(_id: any) {
        var waiter = await WaiterModel.findOne({ user: _id });
        return waiter?._id;
    }
}