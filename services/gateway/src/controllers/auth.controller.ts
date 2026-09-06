import { authProxyService } from "@/services/auth.proxy.service.js";
import { loginSchema, registerSchema } from "@/validation/auth.schema.js";
import { asyncWrapper } from "@chatapp/common";


export const registerUser = asyncWrapper(async(req,res,next)=> {
    const payload = registerSchema.parse(req.body);
    const response = await authProxyService.register(payload);

    res.status(201).json(response);
})


export const loginUser = asyncWrapper(async(req,res,next)=> {
    const payload = loginSchema.parse(req.body);
    


})