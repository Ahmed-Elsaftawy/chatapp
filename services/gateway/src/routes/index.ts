import { authRouter } from "./auth.route.js";
import type { Application, Router } from "express";


export const authRoute = (app: Application) => {
    app.use('/auth', authRouter);
}