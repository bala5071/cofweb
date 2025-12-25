import config from './config/config';
import { createApp } from './app';
import { startServer } from './server';
import logger from './utils/logger';

async function main() {
  try {
    const app = createApp();
    const server = await startServer(app, config.PORT);
    logger.info(`Server started on port ${config.PORT}`);

    // Graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down server...');
      server.close(() => {
        logger.info('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    logger.error(`Failed to start server: ${(err as Error).message}`);
    process.exit(1);
  }
}

void main();
