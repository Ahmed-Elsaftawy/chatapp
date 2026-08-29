import { AuthResponse, LoginInputs, RegisterInputs, UserData } from "@/types/auth.js";
import bcrypt from "bcryptjs";
import { checkUser, loginRepo, registerRepo } from '@/repository/user.repo.js'
import { asyncWrapper, HttpError } from "@chatapp/common";
import { generateRefreshToken, genrateAccessToken, verifyPassword } from "@/utils/token.js";
import { logger } from "@/utils/logger.js";


export const register = async (inputs: RegisterInputs): Promise<AuthResponse> => {
    try {
        const existing = await checkUser(inputs);

        if (existing) {
            throw new HttpError(400, 'this user already exists');
        }
        const hashedPassword = await bcrypt.hash(inputs.password, 12);

        inputs.password = hashedPassword;
        const user = await registerRepo(inputs);
        const { id, email, display_name, created_at } = user;

        const refreshToken = await generateRefreshToken(user.id);
        const accessToken = genrateAccessToken({ id, email, display_name, created_at })

        return { accessToken, refreshToken, user: { email, display_name, id, created_at } }
    } catch (err) {
        logger.error({ err }, "Error with Register Service");
        throw new HttpError(500, 'Error with Register Service')
    }
}

export const login = async (inputs: LoginInputs): Promise<AuthResponse> => {
    try {

        const data: UserData = await loginRepo(inputs);

        if (!verifyPassword(inputs.password, data.password_hash!)) {
            throw new HttpError(401, 'Invalid Password');
        }

        const accessToken = genrateAccessToken(data);

        const refreshToken = await generateRefreshToken(data.id);
        data.password_hash = undefined;

        return { accessToken, refreshToken, user: data };
    } catch (err: any) {
        logger.error({ err }, "eror with login service");
        throw new HttpError(500, err.message)
    }
}