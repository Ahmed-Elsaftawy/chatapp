import type { Request, Response, NextFunction, RequestHandler } from 'express'
export function asyncWrapper(fn: RequestHandler) {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            fn(req, res, next)
        } catch (err) {

            next(err)
        }
    }


}