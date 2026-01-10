import { Router } from "express";
import * as authMiddlewares from "../middlewares/auth";
import * as instrukturAndAsesorValidation from "../middlewares/validation/users";
import * as instrukturOrAsesorController from "../controllers/instrukturOrAsesor";

const instrukturOrAsesorRoutes = (router: Router): void => {
    const userRouter = Router(); 

    router.use('/user', userRouter); // second params is use for registering all user related routes to userRouter ex: /user/create-instruktur-or-asesor etc.

      // registring this all routes to userRouter
      userRouter.post(
            '/create-instruktur-or-asesor',
            authMiddlewares.isAuthorized,
            authMiddlewares.isAdmin,
            instrukturAndAsesorValidation.createOrUpdateInstrukturAndAsesorValidation,
            instrukturOrAsesorController.createInstrukturAndAsesor,
        );
}

export default instrukturOrAsesorRoutes;