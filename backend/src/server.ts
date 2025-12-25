import http from 'http';
import { Application } from 'express';
import logger from './utils/logger';

/**
 * Start the HTTP server and return the server instance.
 * Handles basic startup errors and graceful shutdown is managed by caller.
 */
export async function startServer(app: Application, port: number): Promise<http.Server> {
  return new Promise((resolve, reject) => {
    try {
      const server = http.createServer(app);

      server.listen(port);

      server.on('listening', () => {
        logger.info(`HTTP server listening on port ${port}`);
        resolve(server);
      });

      server.on('error', (err) => {
        logger.error(`Server error: ${(err as Error).message}`);
        reject(err);
      });
    } catch (err) {
      logger.error(`Failed to start server: ${(err as Error).message}`);
      reject(err);
    }
  });
}
