import express, { Express } from 'express';
import { createServer, Server } from 'http';
import loadMiddlewares from './loaders';
import routes from './routes';
import config from './config';
import { loadErrorMiddlewares } from './middlewares/error';

async function main(): Promise<void> {
  try {
    const app: Express = express(); // create an express application
    const server: Server = createServer(app); // create an HTTP server using the express app

    // assign middlewares, routes, and error handlers to express app
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
