import { Pool } from "pg";
import { env } from '../config/env.js'

export const pool = new Pool({
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: Number(env.DB_PORT!),
    user: env.DB_USER,
    statement_timeout: 10000,
    connectionTimeoutMillis: 5000
})
