import { Router } from "express"
import * as authMiddlewares from "../middlewares/auth";
import * as aclMiddlewares from "../middlewares/acl";
import * as commonValidationMiddleware from "../middlewares/validation/common";
import * as detailScheduleMiddlewares from "../middlewares/detailSchedule";
import * as credentialController from "../controllers/credential";

export const credentialRoutes = (router: Router): void => {
    const credentialRouter = Router();

    router.use('/', credentialRouter);

    credentialRouter.post(
        '/:id/send-credential-instruktur-asesor',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddleware.validateIdParams,
        detailScheduleMiddlewares.checkDeatailScheduleIdExists,
        credentialController.sendCredentialInstrukturOrAsesor,
    );
}