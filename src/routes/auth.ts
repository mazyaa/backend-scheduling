import { Router } from "express";
import * as authLoginValidation from "../middlewares/validation/auth";
import * as authController from "../controllers/auth";
import * as authMiddleware from "../middlewares/auth";

const authRoutes = (router: Router): void => {
    const authRouter = Router();

    router.use('/auth', authRouter); // second params is registering all auth related routes ex: /auth/login, /auth/register etc.

    authRouter.post(
        '/login',
        authLoginValidation.loginValidation,
        authController.login
    );

    authRouter.get(
        '/me',
        authMiddleware.isAuthorized,
        authController.getUserInfo
    )
}

export default authRoutes;