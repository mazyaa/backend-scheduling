import { Router } from 'express';
import * as authMiddlewares from '../middlewares/auth';
import * as aclMiddlewares from '../middlewares/acl';
import * as commonValidationMiddleware from '../middlewares/validation/common';
import * as detailScheduleMiddlewares from '../middlewares/detailSchedule';
import * as detailScheduleValidationMiddlewares from '../middlewares/validation/detailSchedule';
import * as detailScheduleController from '../controllers/detailSchedule';
import * as scheduleMiddlewares from '../middlewares/schedule';

export const detailScheduleRoutes = (router: Router): void => {
  const detailScheduleRouter = Router();

  router.use('/detail-schedule', detailScheduleRouter);

  // registring all detail schedule routes will be here in the future
  detailScheduleRouter.put(
    '/:id',
    authMiddlewares.isAuthorized,
    aclMiddlewares.isAdmin,
    commonValidationMiddleware.validateIdParams,
    detailScheduleMiddlewares.checkDeatailScheduleIdExists,
    detailScheduleValidationMiddlewares.updateDetailScheduleValidation,
    detailScheduleController.createDetailSchedule,
  );

  detailScheduleRouter.get(
    '/:id',
    authMiddlewares.isAuthorized,
    aclMiddlewares.isAdmin,
    commonValidationMiddleware.validateIdParams,
    detailScheduleMiddlewares.checkDeatailScheduleIdExists,
    detailScheduleController.getDetailScheduleById,
  );

  detailScheduleRouter.get(
    '/:id/all-detail-schedules',
    authMiddlewares.isAuthorized,
    aclMiddlewares.isAdmin,
    commonValidationMiddleware.validateIdParams,
    scheduleMiddlewares.checkScheduleIdExists,
    detailScheduleController.getAllDetailSchedules,
  );
};
