import { env } from '@/config/env.js'
import { generateRefreshTokenRepo } from '@/repository/refresh.token.js';
import { RefreshToken, UserData } from '@/types/auth.js'
import jwt, { Secret, SignOptions } from 'jsonwebtoken'
import { logger } from '@/utils/logger.js';
import { HttpError } from '@chatapp/common';
import bcrypt from 'bcryptjs';


const ACCESS_TOKEN_SECRET: Secret = env.JWT_SECRET;
const REFRESH_TOKEN_SECRET: Secret = env.JWT_REFRESH_SECRET;
const ACCESS_TOKEN_EXPIRY: string = env.JWT_ACCESS_TOKEN_EXPIRY
const REFRESH_TOKEN_EXPIRY: string = env.JWT_REFRESH_TOKEN_EXPIRY


export const genrateAccessToken = (payload: UserData): string => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY as SignOptions['expiresIn']
    })
}


export const generateRefreshToken = async (userId: string) => {
    try {
        const expiresAt = new Date()

        expiresAt.setDate(expiresAt.getDate() + 30)//30 days expiry

        const tokenId = crypto.randomUUID();

        const payload: RefreshToken = { userId, expiresAt, tokenId };
        await generateRefreshTokenRepo(payload);


        return jwt.sign(
            { userId, tokenId },
            REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRY as SignOptions['expiresIn'] })


    } catch (err: any) {
        logger.error({ err }, `error with creating refresh token`);
        throw new HttpError(500, `${err.message}`);
    }
}



export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}