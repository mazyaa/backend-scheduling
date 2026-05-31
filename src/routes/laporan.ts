import { Router } from 'express';
import * as laporanController from '../controllers/laporan';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';

const laporanRoutes = (router: Router): void => {
    const laporanRouter = Router();

    router.use('/laporan', laporanRouter);

    laporanRouter.get(
        '/sertifikat',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrDirektur,
        laporanController.getLaporanSertifikat,
    );

    laporanRouter.get(
        '/peserta',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrDirektur,
        laporanController.getLaporanPeserta,
    );
};

export default laporanRoutes;
