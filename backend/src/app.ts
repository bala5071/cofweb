import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import config from './config/config';
import publicRoutes from './routes/public.routes';
import adminRoutes from './routes/admin.routes';
import { errorMiddleware } from './middlewares/error.middleware';

/**
 * Create and configure the Express application.
 * Applies security, parsing, routes and error handling.
 */
export function createApp(): Application {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: config.ALLOW_ORIGIN,
      optionsSuccessStatus: 200
    })
  );
  app.use(express.json({ limit: '1mb' }));

  // Public routes
  app.use('/api', publicRoutes());

  // Admin routes
  app.use('/api/admin', adminRoutes());

  // Health check
  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  // Central error handler
  app.use(errorMiddleware);

  return app;
}
