import { createEnv, EnvSchema, z } from '@chatapp/common'
import 'dotenv/config'


const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    AUTH_SERVER_PORT: z.coerce.number().int().min(0).max(65535).default(4003),
    AUTH_DB_URL: z.string().url(),
    DB_HOST: z.string(),
    DB_NAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_PORT: z.string(),
    DB_USER: z.string(),
})

type EnvType = z.infer<typeof envSchema>


export const env: EnvType = createEnv(envSchema, { serviceName: "auth-service" });
export type Env = typeof env