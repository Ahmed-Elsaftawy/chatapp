import express, { NextFunction, Request, Response, urlencoded, type Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from '@/middlewares/erorr-handler.js';

export const createApp = (): Application => {
    const app = express();
    app.use(helmet());
    app.use(cors({
        origin: "*",
        credentials: true
    }))
    app.use(express.json());
    app.use(urlencoded({ extended: true }));

    app.use((req: Request, res: Response, next: NextFunction) => {
        return res.status(404).json({ status: "error", msg: "not found" });
    })

    app.use(errorHandler)
    return app
}