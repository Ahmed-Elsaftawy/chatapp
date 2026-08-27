import { pool } from "@/core/connect_db.js";
import { RefreshToken } from "@/types/auth.js";



export const generateRefreshTokenRepo = async (payload: RefreshToken) => {
    const { userId, tokenId, expiresAt } = payload
    const refreshToken = await pool.query(
        `INSERT INTO refresh_tokens(token_id,expires_at,user_id) VALUES($1,$2,$2) RETURINIG token_id,user_id`,
        [tokenId, expiresAt, userId])

    return refreshToken.rows[0];
}