import { createLogger, format, transports } from 'winston';
import path from 'path';
const { combine, timestamp, json } = format;

// Create logger instance
const logger = createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(path.resolve(), 'logs', 'app.log') })
  ]
});

export { logger };