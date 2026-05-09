import { Router } from "express"
import * as authMiddlewares from "../middlewares/auth";
import * as aclMiddlewares from "../middlewares/acl";
import * as commonValidationMiddleware from "../middlewares/validation/common";
import * as credentialController from "../controllers/credential";

export const credentialRoutes = (router: Router): void => {
    const credentialRouter = Router();

    router.use('/credential', credentialRouter);

    credentialRouter.post(
        '/:id/send-credential',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddleware.validateIdParams,
        credentialController.sendCredential,
    );
}