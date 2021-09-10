import express from 'express';
import { WaiterController } from '../controllers/WaiterController';

export class WaiterRoutes {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        //Add new waiter route for admin
        this.router.post('/addWaiter', async (req: any, res, next) => {
            try {
                let waiter = await new WaiterController(req.user?.type).AddWaiter(req.body);
                res.status(200).send(waiter).end();
            } catch (error) {
                next(error);
            }
        });
    }
}
export const WaiterRoutesApi = new WaiterRoutes().router;