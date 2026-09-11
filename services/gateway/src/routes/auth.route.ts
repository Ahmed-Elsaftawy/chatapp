import { loginUser, registerUser, revokeUser } from '@/controllers/auth.controller.js';
import { loginSchema, registerSchema, revokeSchema } from '@/validation/auth.schema.js';
import { validateRequest } from '@chatapp/common';
import express from 'express';
import { Router } from 'express';

export const authRouter: Router = express.Router();

authRouter.post('/register', registerUser);
authRouter.post('/login', validateRequest({ body: loginSchema }), loginUser);
authRouter.post('/revoke', revokeUser);