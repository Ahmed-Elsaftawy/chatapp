import express from 'express'
import { validateRequest } from '@chatapp/common'
import { registerHandler } from '@/controllers/auth.controller.js'
import { Router } from 'express';


const authRouter: Router = express.Router()

authRouter.post('/register', validateRequest({}), registerHandler)

export default authRouter
