import { HttpError } from "./http-error.js";
import { RequestHandler } from "express";

export interface InternalAuthHandler {
    headerName?:string,
    exemptPath?:string[]
}


const DEFAULT_HEADER_NAME = 'x-internal-token';

export const createInternalAuth = (expectedToken:string,options:InternalAuthHandler = {}):RequestHandler=> {
    const headerName = options.headerName?.toLowerCase() ?? DEFAULT_HEADER_NAME;
    const exemptPath = new Set(options.exemptPath ?? []);

    return (req,res,next)=> {
        if(exemptPath.has(req.path)) {
            next();
            return
        }
        const proviede = req.headers[headerName];
        const token = Array.isArray(proviede) ? proviede[0] : proviede;
        if(typeof token != 'string' || token !== expectedToken) {
            next(new HttpError(401,'unauthrized'));
            return;
        }
        next();
    }
}   