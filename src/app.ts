import express, { Express, Request, Response } from 'express';
import loadMiddlewares from './loaders';
import routes from './routes';
import { loadErrorMiddlewares } from './middlewares/error';

const app: Express = express(); // create an express application

// assign middlewares, routes, and error handlers to express app
loadMiddlewares(app);
routes(app);
loadErrorMiddlewares(app);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the API SCHEDULING and E-CERTIFICATE!',
    data: null,
  });
});

export default app;
