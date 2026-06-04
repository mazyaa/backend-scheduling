import { Router } from 'express';
import * as profileController from '../controllers/profile';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';
import * as profileValidationMiddlewares from '../middlewares/validation/profile';

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
        profileValidationMiddlewares.updateProfileValidation,
        profileController.updateProfile,
    );

    profileRouter.put(
        '/change-password',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrInstrukturOrAsesorOrPeserta,
        profileValidationMiddlewares.changePasswordValidation,
        profileController.changePassword,
    );
};

export default profileRoutes;
