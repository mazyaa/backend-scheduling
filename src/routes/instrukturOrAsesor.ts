import * as aclMiddlewares from "../middlewares/acl";
import * as instrukturOrAsesorController from "../controllers/instrukturOrAsesor";
import * as authMiddlewares from "../middlewares/auth";
import * as instrukturAndAsesorValidationMiddlewares from "../middlewares/validation/instrukturOrAsesor";
import * as userMiddlewares from "../middlewares/users";
import * as commonValidationMiddlewares from "../middlewares/validation/common";
import { Router } from "express";

const instrukturOrAsesorRoutes = (router: Router): void => {
    const instrukturOrAsesorRouter = Router(); 

    router.use('/instruktur-or-asesor', instrukturOrAsesorRouter); // second params is use for registering all user related routes to userRouter ex: /user/create-instruktur-or-asesor etc.

    // registring this all routes to userRouter
    instrukturOrAsesorRouter.post(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        instrukturAndAsesorValidationMiddlewares.createOrUpdateInstrukturAndAsesorValidation,
        instrukturOrAsesorController.createInstrukturAndAsesor,
    );

    instrukturOrAsesorRouter.get(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        userMiddlewares.checkUserIdExists,
        instrukturOrAsesorController.getInstrukturOrAsesorById,
    );

    instrukturOrAsesorRouter.get(
        '/',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        instrukturOrAsesorController.getAllInstrukturAndAsesor,
     );


    instrukturOrAsesorRouter.put(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        instrukturAndAsesorValidationMiddlewares.createOrUpdateInstrukturAndAsesorValidation,
        userMiddlewares.checkUserIdExists,
        userMiddlewares.checkUserEmailorNoWaExists,
        instrukturOrAsesorController.updateInstrukturAndAsesor,
    );

    instrukturOrAsesorRouter.delete(
        '/:id',
        authMiddlewares.isAuthorized,
        aclMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        userMiddlewares.checkUserIdExists,
        instrukturOrAsesorController.deleteInstrukturAndAsesor,
    )
}

export default instrukturOrAsesorRoutes;