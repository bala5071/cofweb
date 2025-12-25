import winston from 'winston';
import config from '../config/config';

const { combine, timestamp, printf, colorize, json } = winston.format;

const devFormat = combine(colorize(), timestamp(), printf(({ level, message, timestamp: ts }) => `${ts} [${level}] ${message}`));
const prodFormat = combine(timestamp(), json());

export const logger = winston.createLogger({
  level: config.LOG_LEVEL || 'info',
  format: config.NODE_ENV === 'production' ? prodFormat : devFormat,
  transports: [new winston.transports.Console()]
});

export default logger;
