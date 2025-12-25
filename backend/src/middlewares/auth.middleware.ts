import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { UnauthorizedError } from '../utils/errors';

export interface AuthenticatedRequest extends Request {
  user?: { id: number; username: string };
}

export function adminAuthMiddleware(req: AuthenticatedRequest, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing Authorization header'));
  }

  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, config.JWT_SECRET) as any;
    req.user = { id: payload.id, username: payload.username };
    next();
  } catch (err) {
    return next(new UnauthorizedError('Invalid or expired token'));
  }
}
