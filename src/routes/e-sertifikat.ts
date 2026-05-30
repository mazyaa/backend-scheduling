import { Router } from 'express';
import * as eSertifikatController from '../controllers/e-sertifikat';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as eSertifikatValidationMiddlewares from '../middlewares/validation/e-sertifikat';

const eSertifikatRoutes = (router: Router): void => {
    const eSertifikatRouter = Router();

    router.use('/e-sertifikat', eSertifikatRouter);

    eSertifikatRouter.post(
        '/:penilaianId/publish',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin, // Only admin can publish according to diagram
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        eSertifikatController.publishSertifikat,
    );

    eSertifikatRouter.get(
        '/:penilaianId/download',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin, // Assume admin can download
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        eSertifikatController.downloadSertifikatZip,
    );
};

export default eSertifikatRoutes;
