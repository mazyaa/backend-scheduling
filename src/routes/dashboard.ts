import { Router } from 'express';
import * as dashboardController from '../controllers/dashboard';
import * as aclMiddlewares from '../middlewares/acl';
import * as authMiddlewares from '../middlewares/auth';

const dashboardRoutes = (router: Router): void => {
    const dashboardRouter = Router();

    router.use('/dashboard', dashboardRouter);

    dashboardRouter.get(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdminOrDirektur,
        dashboardController.getDashboard,
    );
};

export default dashboardRoutes;
