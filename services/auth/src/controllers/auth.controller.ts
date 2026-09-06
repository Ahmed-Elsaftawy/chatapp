import { revokeRefreshTokenRepo } from '@/repository/refresh.token.js';
import { login, register, revoke } from '@/services/auth.services.js';
import { LoginInputs, RegisterInputs } from '@/types/auth.js';
import { asyncWrapper } from '@chatapp/common';


export const registerHandler = asyncWrapper(async (req, res, next) => {
    const payload: RegisterInputs = req.body;
    const { accessToken, refreshToken, user } = await register(payload);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })

    res.status(201).json({ accessToken, user });
    return;
})

export const loginHandler = asyncWrapper(async (req, res, next) => {

    const payload: LoginInputs = req.body;
    const { accessToken, refreshToken, user } = await login(payload);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
    })

    res.status(200).json({ accessToken, user });

    return;
})

export const revokeHandler = asyncWrapper(async (req, res, next) => {
    const userId: string = req.user?.userId as string;

    await revoke(userId);
    res.clearCookie('refreshToken', {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    })
    res.status(200).json({ msg: 'user logged out successfully' });
    return;
})