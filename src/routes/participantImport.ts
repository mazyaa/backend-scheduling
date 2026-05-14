import { Router } from 'express';
import * as participantImportController from '../controllers/participantImport';
import * as authMiddlewares from '../middlewares/auth';
import * as aclMiddlewares from '../middlewares/acl';
import { single } from '../middlewares/mediaMiddleware';

const participantImportRoutes = (router: Router): void => {
    const importRouter = Router();

    router.use('/participant-import', importRouter);

    importRouter.post(
        '/preview',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        single('file'),
        participantImportController.previewImport
    );

    importRouter.post(
        '/commit',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        participantImportController.commitImport
    );
};

export default participantImportRoutes;
