import { Router } from 'express';
import * as sertifikatController from '../controllers/sertifikat';

const sertifikatRoutes = (router: Router): void => {
    const sertifikatRouter = Router();

    router.use('/sertifikat', sertifikatRouter);

    sertifikatRouter.post(
        '/verify',
        sertifikatController.verifySertifikat,
    );
};

export default sertifikatRoutes;
