import { Router } from "express";
import authRouter from "./auth.route.js";

export const registerRouter = (app: Router) => {
    app.use('/auth', authRouter);
}