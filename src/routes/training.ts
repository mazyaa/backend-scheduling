import * as trainingController from '../controllers/training';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as trainingValidationMiddlewares from '../middlewares/validation/training';
import * as trainingMiddlewares from '../middlewares/training';
import { Router } from 'express';

const trainingRoutes = (router: Router): void => {
    const trainingRouter = Router();

    router.use('/training', trainingRouter);

    trainingRouter.post(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        trainingValidationMiddlewares.createOrUpdateTrainingValidation,
        trainingController.createTraining,
    );

    trainingRouter.get(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        trainingValidationMiddlewares.createOrUpdateTrainingValidation,
        trainingMiddlewares.checkTrainingIdExist,
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
        trainingValidationMiddlewares.createOrUpdateTrainingValidation,
        trainingMiddlewares.checkTrainingIdExist,
        trainingController.updateTraining,
    );

    trainingRouter.delete(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        trainingValidationMiddlewares.createOrUpdateTrainingValidation,
        trainingMiddlewares.checkTrainingIdExist,
        trainingController.deleteTraining,
    );
};

export default trainingRoutes;