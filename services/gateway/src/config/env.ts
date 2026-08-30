import { createEnv, z } from "@chatapp/common";



const envSchema = z.object({
    PORT: z.number().max(63000).default(4004)
})

type envType = z.infer<typeof envSchema>;

export const env: envType = createEnv(envSchema, { serviceName: "gateway-service" });
export type Env = typeof env