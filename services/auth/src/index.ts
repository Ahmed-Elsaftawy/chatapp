import { createApp } from './app.js'
import { createServer } from 'http'
import { env } from './config/env.js'
import { logger } from './utils/logger.js'
const main = async () => {
    try {
        const app = createApp()
        const server = createServer(app)
        const port = env.AUTH_SERVER_PORT;

        server.listen(port, () => {
            logger.info({ port }, `Auth server is running....`)

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

void main()