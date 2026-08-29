import { z, ZodObject } from 'zod'


export const registerSchema = z.object({
    body: z.object({
        email: z.email().max(200).lowercase(),
        displayName: z.string().max(20),
        password: z.string().min(8)
    })


})

export const loginSchema = z.object({
    body: z.object({
        email: z.email().max(200).lowercase(),
        password: z.string().min(8)
    })
})

export const refreshSchema = z.object({
    body: z.object({
        refreshToken: z.string()
    })
})


export const revokeSchema = z.object({
    body: z.object({
        userId: z.uuid()
    })
})