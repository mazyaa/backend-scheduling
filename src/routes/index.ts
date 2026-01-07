import { Application, Router } from 'express';
import { authRoutes } from './auth';

const routes = (app: Application): void => {
  const router = Router();

  // basic route for all API operations
  app.use('/api', router); // second params is use for handling all api related routes ex: /api/auth, /api/users etc.

  authRoutes(router); // send router instance to authRoutes to register auth related routes
};

export default routes;
