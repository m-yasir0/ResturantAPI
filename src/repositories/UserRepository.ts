import { UserModel } from '../models/UserModel';
import { IUser } from '../types/Documents/IUser';
export class UserClass {

    /**
     * save new user request from children classes
     */
    protected async SaveNew(user: IUser) {
        let doc = await new UserModel(user).save();
        return doc._id;
    }

    /**
     * Return user based on user_name and password. For login
     */
    ReturnUser(user: any) {
        return UserModel.findOne({ user_name: user.username, password: user.password })
    }

    /**
     * Return user based on id. For role management
     */
    ReturnUserById(id: string) {
        return UserModel.findById(id);
    }
}