import { Application, Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';

const routes = (app: Application): void => {
  const router = Router(); // this value is null at the beginning

  // to read it, if user access routes with /api, it will use this router
  app.use('/api', router); // second params is use for registering all routes to /api path

  // registering all routes to router
  authRoutes(router); 
  userRoutes(router);
};

export default routes;
