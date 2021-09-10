import express from 'express';
import { MenuController } from '../controllers/MenuController';
import { TokenVerifier } from '../middleware/UserAuth';

export class MenuRoutes {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        //Menu list route
        this.router.get('/getMenu', async (req, res, next) => {
            try {
                var menu = await new MenuController("").GetMenu();
                res.status(200).json(
                    {
                        Menu: menu
                    }
                ).end()
            } catch (error) {
                next(error);
            }
        });

        //Adding item to the menu route
        this.router.post('/addMenuItem', TokenVerifier, async (req: any, res, next) => {
            try {
                var item = await new MenuController(req.user?._id).AddMenu(req.body);
                res.status(200).json(
                    item
                ).end()
            } catch (error) {
                next(error);
            }
        });
    }
}
export const MenuRoutesApi = new MenuRoutes().router;