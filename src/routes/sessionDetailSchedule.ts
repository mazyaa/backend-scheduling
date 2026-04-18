import { Router } from 'express';
import * as sessionDetailScheduleController from '../controllers/sessionDetailSchedule';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as sessionDetailScheduleValidationMiddlewares from '../middlewares/validation/sessionDetailSchedule';
import * as commonValidationMiddlewares from '../middlewares/validation/common';
import * as sessionDetailScheduleMiddlewares from '../middlewares/sessionDetailSchedule';
import * as detailScheduleMiddlewares from '../middlewares/detailSchedule';

export const sessionDetailScheduleRouter = (router: Router): void => {
    const sessionDetailScheduleRouter = Router();

    router.use('/session-detail-schedule', sessionDetailScheduleRouter);

    sessionDetailScheduleRouter.post(
        '/single',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        sessionDetailScheduleValidationMiddlewares.createSessionDetailScheduleValidation,
        sessionDetailScheduleController.createSessionDetailSchedule,
    );

    sessionDetailScheduleRouter.post(
        '/:id/batch',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        detailScheduleMiddlewares.checkDeatailScheduleIdExists,
        sessionDetailScheduleValidationMiddlewares.createSessionDetailScheduleValidation,
        sessionDetailScheduleController.generateSessionDetailSchedules,
    );

    sessionDetailScheduleRouter.get(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        sessionDetailScheduleMiddlewares.checkSessionDetailScheduleIdExists,
        sessionDetailScheduleController.getSessionDetailScheduleById,
    );

    sessionDetailScheduleRouter.put(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        sessionDetailScheduleMiddlewares.checkSessionDetailScheduleIdExists,
        sessionDetailScheduleValidationMiddlewares.updateDetailScheduleValidation,
        sessionDetailScheduleController.updateSessionDetailSchedule,
    );

    sessionDetailScheduleRouter.delete(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        sessionDetailScheduleMiddlewares.checkSessionDetailScheduleIdExists,
        sessionDetailScheduleController.deleteSessionDetailSchedule,
    );

    sessionDetailScheduleRouter.get(
        '/:id/all',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        detailScheduleMiddlewares.checkDeatailScheduleIdExists,
        sessionDetailScheduleController.getAllSessionDetailSchedules,
    );
}
