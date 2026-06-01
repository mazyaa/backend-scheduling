import { Router } from 'express';
import * as materiController from '../controllers/materi';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as materiMiddlewares from '../middlewares/materi';
import * as commonValidationMiddlewares from '../middlewares/validation/common';
import { singleMateri } from '../middlewares/uploadMateri';

const materiRoutes = (router: Router): void => {
    const materiRouter = Router();

    router.use('/materi', materiRouter);

    materiRouter.get(
        '/all-materi',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstrukturOrAsesor,
        materiController.getAllMateri,
    );

    materiRouter.get(
        '/my-materi',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isPeserta,
        materiController.getMyMateri,
    );

    materiRouter.get(
        '/:id/download',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstrukturOrPeserta,
        commonValidationMiddlewares.validateIdParams,
        materiController.downloadMateri,
    );

    materiRouter.post(
        '/upload',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstruktur,
        singleMateri,
        materiController.uploadMateri,
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
        singleMateri,
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
