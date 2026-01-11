import { Router } from "express";
import * as instrukturOrAsesorController from "../controllers/instrukturOrAsesor";
import * as authMiddlewares from "../middlewares/auth";
import * as instrukturAndAsesorValidationMiddlewares from "../middlewares/validation/users";
import * as userMiddlewares from "../middlewares/users";
import * as commonValidationMiddlewares from "../middlewares/validation/common";

const instrukturOrAsesorRoutes = (router: Router): void => {
    const instrukturOrAsesorRouter = Router(); 

    router.use('/instruktur-or-asesor', instrukturOrAsesorRouter); // second params is use for registering all user related routes to userRouter ex: /user/create-instruktur-or-asesor etc.

    // registring this all routes to userRouter
    instrukturOrAsesorRouter.post(
        '/',
        authMiddlewares.isAuthorized,
        authMiddlewares.isAdmin,
        instrukturAndAsesorValidationMiddlewares.createOrUpdateInstrukturAndAsesorValidation,
        instrukturOrAsesorController.createInstrukturAndAsesor,
    );

    instrukturOrAsesorRouter.get(
        '/:id',
        authMiddlewares.isAuthorized,
        authMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        userMiddlewares.checkUserIdExists,
        instrukturOrAsesorController.getInstrukturOrAsesorById,
    );

    instrukturOrAsesorRouter.get(
        '/',
        authMiddlewares.isAuthorized,
        authMiddlewares.isAdmin,
        instrukturOrAsesorController.getInstrukturOrAsesorByName,
     );


    instrukturOrAsesorRouter.put(
        '/:id',
        authMiddlewares.isAuthorized,
        authMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        instrukturAndAsesorValidationMiddlewares.createOrUpdateInstrukturAndAsesorValidation,
        userMiddlewares.checkUserIdExists,
        userMiddlewares.checkUserEmailorNoWaExists,
        instrukturOrAsesorController.updateInstrukturAndAsesor,
    );

    instrukturOrAsesorRouter.delete(
        '/:id',
        authMiddlewares.isAuthorized,
        authMiddlewares.isAdmin,
        commonValidationMiddlewares.validateIdParams,
        userMiddlewares.checkUserIdExists,
        instrukturOrAsesorController.deleteInstrukturAndAsesor,
    )
}

export default instrukturOrAsesorRoutes;