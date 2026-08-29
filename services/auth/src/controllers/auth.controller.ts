import { register } from '@/services/auth.services.js';
import { RegisterInputs } from '@/types/auth.js';
import { asyncWrapper } from '@chatapp/common';


export const registerHandler = asyncWrapper(async (req, res, next) => {
    const payload:RegisterInputs = req.body;
    const tokens = await register(payload);
    res.status(201).json({tokens});
})