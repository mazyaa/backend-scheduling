import { Router } from 'express';
import * as eSertifikatController from '../controllers/e-sertifikat';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as eSertifikatValidationMiddlewares from '../middlewares/validation/e-sertifikat';
import * as commonValidationMiddlewares from '../middlewares/validation/common';
import * as scheduleMiddlewares from '../middlewares/schedule';

const eSertifikatRoutes = (router: Router): void => {
    const eSertifikatRouter = Router();

    router.use('/e-sertifikat', eSertifikatRouter);

    eSertifikatRouter.get(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        eSertifikatController.getAllSertifikat,
    );

    eSertifikatRouter.get(
        '/:id/all-peserta',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        scheduleMiddlewares.checkScheduleIdExists,
        eSertifikatController.getAllPeserta,
    );

    eSertifikatRouter.post(
        '/:penilaianId/publish',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        eSertifikatController.publishSertifikat,
    );

    eSertifikatRouter.get(
        '/:penilaianId/download',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrPeserta,
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        eSertifikatController.downloadSertifikatZip,
    );
};

export default eSertifikatRoutes;
