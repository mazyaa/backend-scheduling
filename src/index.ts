import { createServer, Server } from 'http';
import config from './config';
import app from './app';

async function main(): Promise<void> {
  try {
    const server: Server = createServer(app); // create an HTTP server using the express app

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
