import { env } from "@/config/env.js";
import { RefreshToken } from "@/types/auth.js";
import { logger } from "@/utils/logger.js";
import { HttpError } from "@chatapp/common";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";


export const verifyToken: RequestHandler = (req, res, next) => {
    try {
        if (!req.cookies) {
            throw new HttpError(401, 'cookies does not exist');
        }
        const refreshToken = req.cookies.refreshToken;

        const payload: RefreshToken = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET) as RefreshToken;

        req.user = payload;
        next()
    } catch (err: any) {

        logger.error(err)

        if (err instanceof HttpError) return next(err);
        return next(new HttpError(401, 'not authorized'));
    }
}