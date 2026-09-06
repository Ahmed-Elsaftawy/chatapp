import { createEnv, z } from "@chatapp/common";



const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    GATEWAY_PORT: z.coerce.number().max(63000).default(4004),
    AUTH_SERVICE_URL: z.string().url(),
    INTERNAL_API_TOKEN: z.string()
})

type envType = z.infer<typeof envSchema>;

export const env: envType = createEnv(envSchema, { serviceName: "gateway-service" });
export type Env = typeof env