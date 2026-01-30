import * as trainingController from '../controllers/training';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as trainingValidationMiddlewares from '../middlewares/validation/training';
import * as commonValidationMiddlewares from '../middlewares/validation/common';
import * as trainingMiddlewares from '../middlewares/training';
import { Router } from 'express';

const trainingRoutes = (router: Router): void => {
    const trainingRouter = Router();

    router.use('/training', trainingRouter);

    trainingRouter.post(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        trainingValidationMiddlewares.createTrainingValidation,
        trainingMiddlewares.checkTrainingNameDuplicate,
        trainingController.createTraining,
    );

    trainingRouter.get(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        trainingMiddlewares.checkTrainingIdExist,
        commonValidationMiddlewares.validateIdParams,
        trainingController.getTrainingById,
    );

    trainingRouter.get(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        trainingController.getAllTraining,
    );

    trainingRouter.put(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        trainingMiddlewares.checkTrainingIdExist,
        commonValidationMiddlewares.validateIdParams,
        trainingValidationMiddlewares.updateTrainingValidation,
        trainingMiddlewares.checkTrainingNameDuplicate,
        trainingController.updateTraining,
    );

    trainingRouter.delete(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        trainingMiddlewares.checkTrainingIdExist,
        commonValidationMiddlewares.validateIdParams,
        trainingController.deleteTraining,
    );
};

export default trainingRoutes;