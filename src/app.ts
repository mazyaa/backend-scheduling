import express, { Express } from 'express';
import loadMiddlewares from './loaders';
import routes from './routes';
import { loadErrorMiddlewares } from './middlewares/error';


const app: Express = express(); // create an express application

// assign middlewares, routes, and error handlers to express app
loadMiddlewares(app);
routes(app);
loadErrorMiddlewares(app);

export default app;
