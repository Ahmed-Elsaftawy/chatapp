import { RefreshToken } from "./auth.ts";

declare global {
    namespace Express {
        interface Request {
            user?: RefreshToken;
        }
    }
}
export { };