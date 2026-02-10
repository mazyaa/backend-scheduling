import { Router } from "express";
import * as authMiddlewares from "../middlewares/auth";
import * as aclMiddlewares from "../middlewares/acl";
import * as commonValidationMiddleware from "../middlewares/validation/common";
import * as detailScheduleMiddlewares from "../middlewares/detailSchedule";
import * as notificationController from "../controllers/notification";

export const notificationRoutes = (router: Router): void => {
    const notificationRouter = Router();

    router.use('/', notificationRouter);

        notificationRouter.post(
            '/:id/notify',
            authMiddlewares.isAuthorized,
            aclMiddlewares.isAdmin,
            commonValidationMiddleware.validateIdParams,
            detailScheduleMiddlewares.checkDeatailScheduleIdExists,
            notificationController.sendNotification,
        );
}