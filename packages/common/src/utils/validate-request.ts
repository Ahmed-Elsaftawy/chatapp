import { HttpError } from '../Errors/http-error.js'
import type { NextFunction, Request, Response } from 'express'

import { AnyZodObject, ZodError } from 'zod/v3'


type Schema = AnyZodObject;
type ParamRecord = Record<string, string>;
type QueryRecord = Record<string, unknown>;

export interface RequestValidationSchema {
    body?: Schema;
    params?: Schema;
    query?: Schema;
}



const formatError = (err: ZodError) => {
    return err.errors.map((err) => ({
        path: err.path.join('.'),
        message: err.message
    }))

}

export const validateRequest = (schemas: RequestValidationSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if (schemas.body) {
                const parsedBody = schemas.body.parse(req.body) as unknown;
                req.body = parsedBody;
            }
            if (schemas.params) {
                const parsedParams = schemas.params.parse(req.params) as Request['params'];
                req.params = parsedParams
            }
            if (schemas.query) {
                const parsedQuery = schemas.query.parse(req.query) as Request['query'];
                req.query = parsedQuery
            }
            next()
        } catch (err) {
            if (err instanceof ZodError) {
               return next(new HttpError(422, err.message))
            }
            return err
        }
    }
}