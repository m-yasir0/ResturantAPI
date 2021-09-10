import CustomError from '../utills/error';

import { Route, Tags, Post, Body, Security } from "tsoa";
import { Controller } from '@tsoa/runtime';
import { IAddWaiterRequest } from '../types/Requests/IWaiterRequest';
import { IAddWaiterResponse } from '../types/Responses/IWaiterResponses';
import { WaiterClass } from '../repositories/WaiterRepository';


@Route('/waiter')
@Tags('Waiter')
@Security('api_key')
export class WaiterController extends Controller {
    type: string | any;
    constructor(type: string | any) {
        super();
        this.type = type;
    }

    /**
     * This will add new waiter.
     * Login to get acess token for secured end points.
     * @summary "Add new waiter. Admin login required" 
    */
    @Post('addWaiter')
    async AddWaiter(@Body() waiter: IAddWaiterRequest): Promise<IAddWaiterResponse> {
        var NewWaiter: IAddWaiterResponse;
        if (this.type == 'admin') {
            NewWaiter = <IAddWaiterResponse>await new WaiterClass().AddWatier(waiter);
            if (!NewWaiter)
                throw new CustomError(400, "Cannot add Waiter", "Bad Request")
            return <IAddWaiterResponse>NewWaiter;
        } else
            throw new CustomError(403, "Access not allowed", "Forbidden")
    }
}