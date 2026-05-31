import { Router } from 'express';
import * as profileController from '../controllers/profile';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';

const profileRoutes = (router: Router): void => {
    const profileRouter = Router();

    router.use('/profile', profileRouter);

    profileRouter.get(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstrukturOrAsesorOrPeserta,
        profileController.getProfile,
    );

    profileRouter.put(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstrukturOrAsesorOrPeserta,
        profileController.updateProfile,
    );

    profileRouter.put(
        '/change-password',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstrukturOrAsesorOrPeserta,
        profileController.changePassword,
    );
};

export default profileRoutes;
