import * as mediaMiddleware from '../middlewares/mediaMiddleware';
import * as aclMiddleware from '../middlewares/acl';
import * as authMiddleware from '../middlewares/auth';
import * as mediaController from '../controllers/media';
import { Router } from 'express';

const mediaRoutes = (router: Router): void => {
    const mediaRouter = Router();

    router.use('/media', mediaRouter);

    mediaRouter.post(
        '/upload-single',
        authMiddleware.isAuthorized,
        aclMiddleware.isAdmin,
        mediaMiddleware.single('file'),
        mediaController.single,
    );
}

export default mediaRoutes;
