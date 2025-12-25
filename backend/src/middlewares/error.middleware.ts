import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { AppError } from '../utils/errors';

export function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof AppError) {
    logger.warn(`${err.code}: ${err.message}`);
    res.status(err.statusCode).json({ error: err.code, message: err.message, details: err.details });
    return;
  }

  logger.error(`Unhandled error: ${(err as Error).message}`);
  res.status(500).json({ error: 'INTERNAL_ERROR', message: 'An unexpected error occurred' });
}
