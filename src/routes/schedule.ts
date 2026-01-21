import { Router } from "express";
import * as scheduleController from "../controllers/schedule";
import * as aclMiddlewares from "../middlewares/acl";
import * as authMiddlewares from "../middlewares/auth";
import * as scheduleValidationMiddlewares from "../middlewares/validation/schedule";
import * as commonValidationMiddleware from "../middlewares/validation/common";
import * as scheduleMiddlewares from "../middlewares/schedule";

export const scheduleRoutes = (router: Router): void => {
    const scheduleRouter = Router();

    router.use('/schedule', scheduleRouter); 

    scheduleRouter.post(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        scheduleValidationMiddlewares.createScheduleValidation,
        scheduleController.createSchedule,
    );

    scheduleRouter.get(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddleware.validateIdParams,
        scheduleMiddlewares.checkScheduleIdExists,
        scheduleController.getScheduleById,
    );

    scheduleRouter.put(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddleware.validateIdParams,
        scheduleMiddlewares.checkScheduleIdExists,
        scheduleValidationMiddlewares.updateScheduleValidation,
        scheduleController.updateSchedule,
    )
}