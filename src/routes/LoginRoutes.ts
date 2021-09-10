import express from 'express';
import { LoginController } from '../controllers/LoginController';
export class LoginRoutes {
    router: express.Router;
    constructor() {
        this.router = express.Router();
        this.routes();
    }
    routes() {

        //User login
        this.router.post('/login', async (req, res, next) => {
            try {
                var response = await new LoginController().login(req.body);
                res.status(200).json({
                    token_key: response.token_key,
                    message: response.message
                }).end();
            } catch (err) {
                next(err);
            }

        });
    }
}
export const LoginRoutesApi = new LoginRoutes().router;