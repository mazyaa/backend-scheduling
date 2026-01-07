import { Router } from "express";
import * as authLoginValidation from "../middlewares/validation/auth";
import * as authController from "../controllers/auth";


export const authRoutes = (app: Router): void => {
    const router = Router();

    app.use('/auth', router); // second params is use for handling all auth related routes ex: /auth/login, /auth/certificate etc.

    router.post(
        '/login',
        authLoginValidation.loginValidation,
        authController.login
    );
}