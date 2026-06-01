import { Router } from 'express';
import * as participantController from '../controllers/participant';
import * as participantMiddlewares from '../middlewares/participant';
import * as authMiddlewares from '../middlewares/auth';
import * as aclMiddlewares from '../middlewares/acl';
import { validateIdParams } from '../middlewares/validation/common';
import { createPesertaValidation, updatePesertaValidation } from '../middlewares/validation/participant';
import * as scheduleMiddlewares from '../middlewares/schedule';

const participantRoutes = (router: Router): void => {
    const participantRouter = Router();

    router.use('/participant', participantRouter);

    participantRouter.use(authMiddlewares.isAuthorized, aclMiddlewares.isAdminOrInstrukturOrAsesor);

    participantRouter.post(
        '/',
        createPesertaValidation,
        participantMiddlewares.checkDuplicatePeserta,
        participantController.createPeserta
    );

    participantRouter.get(
        '/',
        participantController.getAllParticipant
    );

    participantRouter.get(
        '/schedule/:id',
        validateIdParams,
        scheduleMiddlewares.checkScheduleIdExists,
        participantController.getAllParticipant
    );

    participantRouter.get(
        '/:id',
        validateIdParams,
        participantMiddlewares.checkPesertaId,
        participantController.getPesertaById
    );

    participantRouter.put(
        '/:id',
        validateIdParams,
        participantMiddlewares.checkPesertaId,
        updatePesertaValidation,
        participantMiddlewares.checkDuplicatePeserta,
        participantController.updatePeserta
    );

    participantRouter.delete(
        '/:id',
        validateIdParams,
        participantMiddlewares.checkPesertaId,
        participantController.deletePeserta
    );
};

export default participantRoutes;
