import { Application, Request, Response, Router } from 'express';
import authRoutes from './auth';
import instrukturOrAsesorRoutes from './instrukturOrAsesor';
import trainingRoutes from './training';
import { scheduleRoutes } from './schedule';
import { detailScheduleRoutes } from './detailSchedule';
import { notificationRoutes } from './notification';
import { credentialRoutes } from './credential';

const routes = (app: Application): void => {
  const router = Router(); // this value is null at the beginning

  // to read it, if user access routes with /api, it will use this router
  app.use('/api', router); // second params is use for registering all routes to /api path

  app.use('/', (_req: Request, res: Response) => {
    res.status(200).json({
      message: 'Welcome to the API SCHEDULING and E-CERTIFICATE!',
      data: null,
    });
  });

  // registering all routes to router
  authRoutes(router);
  instrukturOrAsesorRoutes(router);
  trainingRoutes(router);
  scheduleRoutes(router);
  detailScheduleRoutes(router);
  notificationRoutes(router);
  credentialRoutes(router);
};

export default routes;
