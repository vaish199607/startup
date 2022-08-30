import { ErrorLogger } from '../utils/logger.js';

export const LogHandler = async (err, _req, _res, next) => {
    const logger = new ErrorLogger();
    await logger.error(err);
    next(err);
}