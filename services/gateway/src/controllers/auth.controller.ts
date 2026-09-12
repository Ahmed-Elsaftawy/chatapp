import { env } from "@/config/env.js";
import { authProxyService } from "@/services/auth.proxy.service.js";
import { cookiesSchema, loginSchema, registerSchema, revokeSchema } from "@/validation/auth.schema.js";
import { asyncWrapper } from "@chatapp/common";


export const registerUser = asyncWrapper(async (req, res, next) => {
   
        const payload = registerSchema.parse(req.body);
        const response = await authProxyService.register(payload);

        res.status(201).json(response);
    
})


export const loginUser = asyncWrapper(async (req, res, next) => {
    const payload = loginSchema.parse(req.body);

    const response = await authProxyService.login(payload);
    console.log('response from gateway service', response);


    const refreshToken = response?.headers![0].split('=')[1].split(';')[0]

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV != 'development' || true,
        sameSite: 'strict'
    })
    res.status(200).json(response?.data)

})

export const revokeUser = asyncWrapper(async (req, res, next) => {
    console.log(req.cookies)
    const cookies = cookiesSchema.parse(req.cookies);

    const response = await authProxyService.revoke(cookies);

    res.clearCookie('refreshToken', {
        secure: true,
        httpOnly: true,
        sameSite: 'strict'
    })

    return res.status(200).json(response);
})