import type { Request, Response, NextFunction } from 'express'
export function asyncWrapper(fn: Function) {

    return (req: Request, res: Response, next: NextFunction) => {
        try {
            fn(req, res, next)
        } catch (err) {

            next(err)
        }
    }


}