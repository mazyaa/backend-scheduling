import { Router } from 'express';
import * as assesmentController from '../controllers/assesment';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as assesmentMiddlewares from '../middlewares/assesment';
import * as assesmentValidationMiddlewares from '../middlewares/validation/assesment';
import * as commonValidationMiddlewares from '../middlewares/validation/common';
import * as scheduleMiddlewares from '../middlewares/schedule';

const assesmentRoutes = (router: Router): void => {
    const assesmentRouter = Router();

    router.use('/assesment', assesmentRouter);

    assesmentRouter.post(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrAsesor,
        assesmentValidationMiddlewares.createAssesmentValidation,
        assesmentController.createAssesment,
    );

    assesmentRouter.get(
        '/:id/all-assesment',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrAsesor,
        commonValidationMiddlewares.validateIdParams,
        scheduleMiddlewares.checkScheduleIdExists,
        assesmentController.getAllAssesment,
    );

    assesmentRouter.get(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrAsesor,
        commonValidationMiddlewares.validateIdParams,
        assesmentMiddlewares.checkAssesmentIdExists,
        assesmentController.getAssesmentById,
    );

    assesmentRouter.put(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrAsesor,
        commonValidationMiddlewares.validateIdParams,
        assesmentMiddlewares.checkAssesmentIdExists,
        assesmentValidationMiddlewares.updateAssesmentValidation,
        assesmentController.updateAssesment,
    );

    assesmentRouter.delete(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        assesmentMiddlewares.checkAssesmentIdExists,
        assesmentController.deleteAssesment,
    );
}

export default assesmentRoutes;
