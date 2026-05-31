import { Router } from 'express';
import * as penilaianController from '../controllers/penilaian';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';

const penilaianRoutes = (router: Router): void => {
    const penilaianRouter = Router();

    router.use('/penilaian', penilaianRouter);

    penilaianRouter.get(
        '/my-status',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isPeserta,
        penilaianController.getMyStatus,
    );

    penilaianRouter.get(
        '/:jadwalTrainingId/penilaian',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrAsesor,
        penilaianController.getPenilaianPeserta,
    );
};

export default penilaianRoutes;
