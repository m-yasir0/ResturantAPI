import express from 'express';
import dotenv from 'dotenv'

import { WaiterRoutesApi } from './WaiterRoutes';
import { MenuRoutesApi } from './MenuRoutes';
import { OrderRoutesApi } from './OrderRoutes';
import { LoginRoutesApi } from './LoginRoutes';
import { TokenVerifier } from '../middleware/UserAuth';
;

dotenv.config();
export class MainRouter {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        //using MenuRoutesApi from MenuRoutes
        this.router.use('/menu', MenuRoutesApi);

        //using TokenVerifier to verify and OrderRoutesApi from OrderRoutes
        this.router.use('/order', TokenVerifier, OrderRoutesApi);

        //loginRoutesApi route from LoginRoutes
        this.router.use(LoginRoutesApi);

        //using TokenVerifier to verify and WaiterRoutesApi from WaiterRoutes
        this.router.use('/waiter', TokenVerifier, WaiterRoutesApi);
    }


}
//Export MainApi to use in main index file
export const MainApi = new MainRouter().router;