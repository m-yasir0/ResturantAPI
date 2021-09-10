import { IOrder, ISingleOrderItem } from "../Documents/IOrder";
import { IWaiter } from "../Documents/IWaiter";

export interface IGetOrderResponse {
    _id: string | any;
    waiter: IWaiter | any;
    items: Array<ISingleOrderItem>;
    order_table: number;
    order_status: string;
    createdAt?: Date;
    updatedAt?: Date
}
export interface IOrderBill {
    _id: string;
    order_id: IOrder | any;
    total_price: number;
    items: Array<ISingleOrderItem>;
    createdAt?: Date;
    updatedAt?: Date
}