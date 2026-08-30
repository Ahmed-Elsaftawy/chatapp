import express, { Application } from 'express';
import helmet from 'helmet'
import cors from 'cors'
import { errorHandler } from '@/middlewares/erorr-handler.js';
import { HttpError } from '@chatapp/common';
export const createApp = (): Application => {
    try {
        const app = express();

        app.use(helmet());
        app.use(cors({
            origin: '*',
            credentials: true,
        }))
        app.use(express.json());
        app.use((req, res) => {
            return res.status(404).json({ status: "error", msg: "not found" });
        })
        app.use(errorHandler);
        return app;
    } catch (err: any) {
        throw new HttpError(500, 'unhandled Error', err.message);
    }
}


