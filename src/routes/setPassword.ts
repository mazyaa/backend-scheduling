import { Router } from "express";
import * as setPasswordValidationMiddleware from '../middlewares/validation/setPassword';
import * as setPasswordController from '../controllers/setPassword';

export const setPasswordRoutes = (router: Router) => {
    const setPasswordRouter = Router();

    router.use('/set-password', setPasswordRouter);

    setPasswordRouter.put(
        '/',
        setPasswordValidationMiddleware.setPasswordValidation,
        setPasswordController.setPassword
    );
}