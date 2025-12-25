import { RequestHandler } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * Returns an Express middleware that validates a request (body, params, or query)
 * using a provided Zod schema. On validation failure it throws a ValidationError.
 */
export function validateSchema(schema: ZodSchema, source: 'body' | 'params' | 'query' = 'body'): RequestHandler {
  return (req, _res, next) => {
    try {
      const data = req[source as keyof typeof req] as unknown;
      const parsed = schema.parse(data);
      // Attach parsed data to request for downstream handlers
      (req as any)[`validated_${source}`] = parsed;
      next();
    } catch (err) {
      if (err && (err as any).issues) {
        const details = (err as any).issues.map((issue: any) => ({ path: issue.path.join('.'), message: issue.message }));
        return next(new ValidationError('Request validation failed', details));
      }
      return next(err);
    }
  };
}
