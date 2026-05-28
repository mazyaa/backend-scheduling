import { Router } from 'express';
import * as materiController from '../controllers/materi';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as materiMiddlewares from '../middlewares/materi';
import * as materiValidationMiddlewares from '../middlewares/validation/materi';
import * as commonValidationMiddlewares from '../middlewares/validation/common';
import * as detailJadwalTrainingMiddlewares from '../middlewares/detailSchedule';

const materiRoutes = (router: Router): void => {
    const materiRouter = Router();

    router.use('/materi', materiRouter);

    materiRouter.post(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstruktur,
        materiValidationMiddlewares.createMateriValidation,
        materiController.createMateri,
    );

    materiRouter.get(
        '/:id/all-materi',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstrukturOrAsesor,
        commonValidationMiddlewares.validateIdParams,
        detailJadwalTrainingMiddlewares.checkDeatailScheduleIdExists,
        materiController.getAllMateri,
    );

    materiRouter.get(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstrukturOrAsesor,
        commonValidationMiddlewares.validateIdParams,
        materiMiddlewares.checkMateriIdExists,
        materiController.getMateriById,
    );

    materiRouter.put(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstruktur,
        commonValidationMiddlewares.validateIdParams,
        materiMiddlewares.checkMateriIdExists,
        materiValidationMiddlewares.updateMateriValidation,
        materiController.updateMateri,
    );

    materiRouter.delete(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstruktur,
        commonValidationMiddlewares.validateIdParams,
        materiMiddlewares.checkMateriIdExists,
        materiController.deleteMateri,
    );
}

export default materiRoutes;
