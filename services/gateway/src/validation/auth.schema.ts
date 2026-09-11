import { z } from '@chatapp/common'


export const registerSchema = z.object({
    email: z.email().max(200).lowercase(),
    displayName: z.string().max(20),
    password: z.string().min(8)
})




export const loginSchema = z.object({

    email: z.email().max(200).lowercase(),
    password: z.string().min(8)

})

export const refreshSchema = z.object({
    refreshToken: z.string()

})


export const revokeSchema = z.object({
    refreshToken: z.string(),
    userId: z.uuid().optional()
})


export const cookiesSchema = z.object({
    refreshToken: z.string()
})