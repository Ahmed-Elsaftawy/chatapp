import { pool } from "@/core/connect_db.js";
import { RefreshToken } from "@/types/auth.js";
import { logger } from "@/utils/logger.js";
import { HttpError } from "@chatapp/common";



export const generateRefreshTokenRepo = async (payload: RefreshToken) => {
    try {
        const { userId, tokenId, expiresAt } = payload
        const refreshToken = await pool.query(
            `INSERT INTO refresh_tokens(token_id,expires_at,user_id) VALUES($1,$2,$3) RETURNING *`,
            [tokenId, expiresAt, userId])

        return refreshToken.rows[0];
    } catch (err: any) {
        logger.error({ err }, "Error with insert refresh token to database");
        new HttpError(500, err.message, 'problem with database')
    }
}

export const revokeRefreshTokenRepo = async (userId: string) => {

    await pool.query('DELETE FROM refresh_tokens WHERE user_id =$1', [userId]);
    return;
}