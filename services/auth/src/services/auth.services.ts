import { AuthResponse, RegisterInputs } from "@/types/auth.js";
import bcrypt from "bcryptjs";
import { checkUser, registerRepo } from '@/repository/user.repo.js'
import { HttpError } from "@chatapp/common";
import { generateRefreshToken, genrateAccessToken } from "@/utils/token.js";
import { logger } from "@/utils/logger.js";
import { pool } from "@/core/connect_db.js";


export const register = async (inputs: RegisterInputs): Promise<AuthResponse> => {
    try {
        const existing = await checkUser(inputs);

        if (existing) {
            throw new HttpError(400, 'this user already exists')
        }
        const hashedPassword = await bcrypt.hash(inputs.password, 12);
        inputs.password = hashedPassword;
        const user = await registerRepo(inputs);

        const { id, email, displayName, created_at } = user;

        const refreshToken = await generateRefreshToken(user.id);
        const accessToken = genrateAccessToken({ id, email, displayName, created_at })

        return { accessToken, refreshToken, user: { email, displayName, id, created_at } }
    } catch (err) {
        logger.error({ err }, "Error with Register Service");
        throw new HttpError(500, 'Error with Register Service')
    }
}


