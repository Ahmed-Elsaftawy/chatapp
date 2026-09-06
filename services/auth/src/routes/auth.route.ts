import express from 'express'
import { validateRequest } from '@chatapp/common'
import { loginHandler, registerHandler, revokeHandler } from '@/controllers/auth.controller.js'
import { Router } from 'express';
import { loginSchema, registerSchema, revokeSchema } from './auth.schema.js';
import { verifyToken } from '@/middlewares/verifyToken.js';

const authRouter: Router = express.Router()

authRouter.post('/register', validateRequest({ body: registerSchema.shape.body }), registerHandler)
authRouter.post('/login', validateRequest({ body: loginSchema.shape.body }), loginHandler)
authRouter.post('/revoke', verifyToken,revokeHandler);

export default authRouter
