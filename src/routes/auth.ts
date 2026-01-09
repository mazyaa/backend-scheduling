import { Router } from "express";
import * as authLoginValidation from "../middlewares/validation/auth";
import * as authMiddlewares from "../middlewares/auth";
import * as instrukturAndAsesorValidation from "../middlewares/validation/users";
import * as userMiddlewares from "../middlewares/users";
import * as authController from "../controllers/auth";
import * as userController from "../controllers/users";

export const authRoutes = (app: Router): void => {
    const router = Router();

    app.use('/auth', router); // second params is use for handling all auth related routes ex: /auth/login, /auth/certificate etc.

    router.post(
        '/create-instruktur-or-asesor',
        authMiddlewares.isAuthorized,
        authMiddlewares.isAdmin,
        instrukturAndAsesorValidation.createOrUpdateInstrukturAndAsesorValidation,
        userMiddlewares.checkUserEmailorNoWaExists,
        userController.createInstrukturAndAsesor,
    );


    router.post(
        '/login',
        authLoginValidation.loginValidation,
        authController.login
    );
}