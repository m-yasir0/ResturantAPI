import express from 'express';
import { OrderController } from '../controllers/OrderController';

export class OrderRoutes {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        //taking order route
        this.router.post('/takeOrder', async (req: any, res, next) => {
            try {
                var order = await new OrderController(req.user?._id).takeOrder(req.body);
                res.status(200).json(
                    order
                ).end()
            } catch (error) {
                next(error);
            }
        });

        //Viewing order route for Admin/Waiter based on session
        this.router.get('/viewOrders', async (req: any, res, next) => {
            try {
                var orders = await new OrderController(req.user?._id).ViewOrders();
                res.status(200).json({
                    Orders: orders
                }).end()
            } catch (error) {
                next(error);
            }
        });

        //Update order status route for admin
        this.router.put('/updateOrderStatus', async (req: any, res, next) => {
            try {
                var order = await new OrderController(req.user?._id).UpdateStatus(req.body);
                res.status(200).json(
                    order
                ).end()
            } catch (error) {
                next(error);
            }
        });
    }
}
export const OrderRoutesApi = new OrderRoutes().router;