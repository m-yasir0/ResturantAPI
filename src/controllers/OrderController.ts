import { Get, Route, Tags, Post, Body, Put, SuccessResponse } from "tsoa";
import { Controller, Security } from '@tsoa/runtime';
import { OrderClass } from '../repositories/OrderRepository';
import { ITakeOrderRequest } from '../types/Requests/IOrderRequest';
import { IGetOrderResponse, IOrderBill } from '../types/Responses/IOrderResponses';
import { UserClass } from '../repositories/UserRepository';
import CustomError from '../utills/error';
import { IOrder } from "../types/Documents/IOrder";

@Route('/order')
@Tags('Order')
@Security('api_key')
export class OrderController extends Controller {
    _id: string;
    constructor(id: string) {
        super();
        this._id = id;
    }

    /**
     * This will create order for customer and return bill.
     * Login to get acess token for secured end points.
     * Waiter will be added on runtime form user session.
     * @summary "Create order for waiter. Waiter login required" 
    */
    @Post("/takeOrder")
    async takeOrder(@Body() order: ITakeOrderRequest): Promise<IOrderBill> {
        var user = await new UserClass().ReturnUserById(this._id);
        var UserType = user?.type;
        if (UserType == 'waiter') {
            const bill: IOrderBill = <IOrderBill>await new OrderClass().CreateOrder(order, this._id);
            if (!bill)
                throw new CustomError(400, "Cannot create bill/ order", "Bad request");
            return <IOrderBill>bill;
        } else
            throw new CustomError(403, "Access not allowed", "Frobidden");
    }

    /**
     * End point to view orders.
     * Login to get acess token for secured end points.
     * Return all orders for admin and particular waiter orders for waiter based on user session.
     * @summary "View Orders All/Waiter's" 
    */
    @Get("/viewOrders")
    async ViewOrders(): Promise<IGetOrderResponse[]> {
        const orders: IGetOrderResponse[] = <IGetOrderResponse[]>await new OrderClass().GetOrders(this._id);
        if (!orders)
            throw new CustomError(404, "Cannot find Orders", "Not Found");
        return <IGetOrderResponse[]>orders;
    }

    /**
     * This will update order status.
     * Login to get acess token for secured end points.
     * @summary "Update order status to waiting/completed. Admin login required" 
    */
    @Put("/updateOrderStatus")
    @SuccessResponse(200, 'Status Updated')
    async UpdateStatus(@Body() order: { _id: string, status: "waiting" | "completed" }): Promise<IOrder> {
        var user = await new UserClass().ReturnUserById(this._id);
        var UserType = user?.type;
        if (UserType == 'admin') {
            const updatedorder = await new OrderClass().UpdateStatus(order);
            if (!updatedorder)
                throw new CustomError(404, "Cannot find and update order status", "Not Found");
            return <IOrder>updatedorder;
        } else
            throw new CustomError(403, "Access not allowed", "Frobidden");
    }
}