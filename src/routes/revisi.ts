import { Router } from 'express';
import * as revisiController from '../controllers/revisi';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as eSertifikatValidationMiddlewares from '../middlewares/validation/e-sertifikat';
import { singleRevisi } from '../middlewares/uploadRevisi';

const revisiRoutes = (router: Router): void => {
    const revisiRouter = Router();

    router.use('/e-sertifikat', revisiRouter);

    revisiRouter.put(
        '/:penilaianId/revisi',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        singleRevisi,
        revisiController.uploadRevisiAdmin,
    );

    revisiRouter.get(
        '/:penilaianId/revisi/download',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrPeserta,
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        revisiController.downloadRevisiFile,
    );

    revisiRouter.put(
        '/:penilaianId/revisi-peserta',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isPeserta,
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        singleRevisi,
        revisiController.uploadRevisiPeserta,
    );

    revisiRouter.get(
        '/:penilaianId/revisi-peserta/download',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrPeserta,
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        revisiController.downloadRevisiPesertaFile,
    );

    revisiRouter.put(
        '/:penilaianId/setujui',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrAsesor,
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        revisiController.setujuiRevisi,
    );

    revisiRouter.put(
        '/:penilaianId/tolak',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrAsesor,
        eSertifikatValidationMiddlewares.validatePenilaianIdParams,
        revisiController.tolakRevisi,
    );
};

export default revisiRoutes;
