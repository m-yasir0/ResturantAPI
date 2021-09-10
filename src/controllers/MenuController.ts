import CustomError from '../utills/error';

import { Get, Route, Tags, Post, Body, Security } from "tsoa";
import { IAddMenuItemResponse } from '../types/Responses/IMenuResponses';
import { MenuClass } from "../repositories/MenuRepository";
import { IAddMenuRequest } from '../types/Requests/IMenuRequest';
import { IMenuItem } from '../types/Documents/IMenu';
import { Controller } from '@tsoa/runtime';
import { UserClass } from '../repositories/UserRepository';

@Route('/menu')
@Tags('Menu')
export class MenuController extends Controller {
    _id: string;
    constructor(_id: string) {
        super();
        this._id = _id;
    }

    /**
    * Get all menu Items
    * @summary "Open API to get Menu Items" 
    */
    @Get("/getMenu")
    async GetMenu(): Promise<IMenuItem[]> {
        const menu = await new MenuClass().GetMenu();
        if (!menu || menu.length == 0)
            throw new CustomError(404, "No listed items in menu", "Not Found");
        return <IMenuItem[]>menu;
    }

    /**
     * This will add new Item to the menu.
     * Login to get acess token for secured end points
     * @summary "Add new Item to menu. Admin login required" 
    */
    @Security('api_key')
    @Post("/addMenuItem")
    async AddMenu(@Body() menu: IAddMenuRequest): Promise<IAddMenuItemResponse> {
        var user = await new UserClass().ReturnUserById(this._id);
        var UserType = user?.type;
        if (UserType == 'admin') {
            const item: IAddMenuItemResponse = <IAddMenuItemResponse>await new MenuClass().AddMenu(menu);
            if (!item)
                throw new CustomError(400, "Cannot add menu item", "Bad Request");
            return <IAddMenuItemResponse>item;
        }
        else
            throw new CustomError(403, "Access not allowed", "Forbidden")
    }
}