import { Router } from "express";
import * as scheduleController from "../controllers/schedule";
import * as aclMiddlewares from "../middlewares/acl";
import * as authMiddlewares from "../middlewares/auth";
import * as scheduleValidationMiddlewares from "../middlewares/validation/schedule";

export const scheduleRoutes = (router: Router): void => {
    const scheduleRouter = Router();

    router.use('/schedule', scheduleRouter); 

    scheduleRouter.post(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        scheduleValidationMiddlewares.createScheduleValidation,
        scheduleController.createSchedle,
    );
}