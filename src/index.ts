import express from 'express';
import { createServer } from 'http';
import loadMiddlewares from './loaders';
import routes from './routes';
import config from './config';
import { loadErrorMiddlewares } from './middlewares/error';

async function main(): Promise<void> {
  try {
    const app = express(); // create an express application
    const server = createServer(app); // create an HTTP server using the express app

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
