import { ISingleOrderItem } from "../Documents/IOrder";

export interface ITakeOrderRequest {
    items: Array<ISingleOrderItem>
    order_table: number;
}