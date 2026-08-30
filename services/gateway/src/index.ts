import { createApp } from "@/app.js"
import { Application } from "express"
import { createServer, Server } from "http"
import { env } from "./config/env.js";
import { logger } from "./utils/logger.js";

const main = async () => {
    try {
        const app: Application = createApp();
        const server: Server = createServer();
        const port = env.PORT

        server.listen(port, async () => {
            logger.info({ port }, `Auth server is running....`)
            logger.info(`Auth-database is connected....`)

        })


        const shutdown = () => {
            logger.info("shutting down the auth server")
            Promise.all([]).catch((err: unknown) => {
                logger.error({ err }, "error with colsing auth service")
            }).finally(() => {
                server.close(() => {
                    process.exit(0)

                });
            })
        }

        process.on('SIGINT', shutdown)
        process.on('SIGTERM', shutdown)

    } catch (err) {
        logger.error({ err }, "failed to start auth server")
        process.exit(1)
    }
}

main();