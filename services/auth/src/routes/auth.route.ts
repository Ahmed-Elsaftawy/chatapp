import express from 'express'
import { validateRequest } from '@chatapp/common'
import { loginHandler, registerHandler } from '@/controllers/auth.controller.js'
import { Router } from 'express';
import { loginSchema, registerSchema } from './auth.schema.js';

const authRouter: Router = express.Router()

authRouter.post('/register', validateRequest({ body: registerSchema.shape.body }), registerHandler)
authRouter.post('/login', validateRequest({ body: loginSchema.shape.body }), loginHandler)

export default authRouter
