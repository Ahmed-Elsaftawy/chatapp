import type { ErrorRequestHandler } from 'express'
import { logger } from '@/utils/logger.js'


export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    logger.error({ err }, "Unhandled Error happened")

    const error = err || undefined;
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error"
    return res.status(statusCode).json({ error: error.stack, msg: message })
}
