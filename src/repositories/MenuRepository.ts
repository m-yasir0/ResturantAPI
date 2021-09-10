
import { MenuModel } from '../models/MenuModel';
import { IAddMenuRequest } from '../types/Requests/IMenuRequest';
export class MenuClass {

    /**
    *Add new menu to the Menu document
    */
    AddMenu(menu: IAddMenuRequest) {
        return new MenuModel(menu).save();
    }

    /**
     *  returns all menu Items
     */
    GetMenu() {
        return MenuModel.find();
    }

}