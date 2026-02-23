import { createServer, Server } from 'http';
import config from './config';
import express, { Express } from 'express';
import loadMiddlewares from './loaders';
import routes from './routes';
import { loadErrorMiddlewares } from './middlewares/error';

async function main(): Promise<void> {
  try {
    const app: Express = express(); // create an express application

    const server: Server = createServer(app); // create an HTTP server using the express app

    loadMiddlewares(app);
    routes(app);
    loadErrorMiddlewares(app);

    server.listen(config.port, () => {
      console.log(
        `Server running in ${config.nodeEnv} mode on http://localhost:${config.port}/api`,
      );
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

main();
