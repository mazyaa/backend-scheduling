import { Router } from 'express';
import * as myTrainingController from '../controllers/myTraining';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';

const myTrainingRoutes = (router: Router): void => {
    const myTrainingRouter = Router();

    router.use('/my-training', myTrainingRouter);

    myTrainingRouter.get(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isPesertaOrInstrukturOrAsesor,
        myTrainingController.getMyTraining,
    );

    myTrainingRouter.get(
        '/:jadwalTrainingId/detail',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isPesertaOrInstrukturOrAsesor,
        myTrainingController.getDetailJadwal,
    );

    myTrainingRouter.get(
        '/:detailJadwalId/sesi',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isPesertaOrInstrukturOrAsesor,
        myTrainingController.getSesiDetail,
    );
};

export default myTrainingRoutes;
