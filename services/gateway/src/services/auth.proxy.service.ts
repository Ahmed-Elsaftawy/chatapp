import axios from "axios";
import { HttpError } from "@chatapp/common";
import { env } from "@/config/env.js";


const client = axios.create({
    baseURL: env.AUTH_SERVICE_URL,
    timeout: 5000,
    withCredentials: true
})


const authHeader = {
    headers: {
        "X-Internal-Token": env.INTERNAL_API_TOKEN
    }
} as const;

export interface AuthTokens {
    accessToken: string,
    refershToken: string
}
export interface UserData {
    id: number,
    email: string,
    displayName: string,
    createdAt: Date
}

export interface AuthResponse extends AuthTokens {
    user: UserData
}

export interface LoginPayload {
    email: string,
    password: string
}

export interface RegisterPayload {
    email: string,
    password: string,
    displayName: string,
}
export interface RefreshPayload {
    refreshToken: string
}

export interface RevokePayload {
    userId: string
}
export interface CookiesSchema {
    refreshToken: string
}
const resolvedMessage = (status: number, data: unknown): string => {
    if (typeof data === 'object' && data && 'message' in data) {
        const message = (data as Record<string, unknown>).message;
        if (typeof message == 'string' && message) {
            return message;
        }
    }

    return status >= 500 ? 'Authentcation server is not available' : "An Error occured whle proccessing the request";
}

const handelAxiosError = (error: any): never => {
    if (axios.isAxiosError(error) || !error.response) {
        throw new HttpError(500, 'Authentacions servser is not available');
    }
    const { status, data } = error.response as { status: number, data: unknown };
    throw new HttpError(status, resolvedMessage(status, data));
}


export const authProxyService = {
    async register(payload: RegisterPayload) {
        try {
            const response = await client.post('/auth/register', payload, authHeader);
            return response.data;
        } catch (err) {
            handelAxiosError(err)
        }
    },
    async login(payload: LoginPayload) {
        try {

            const response = await client.post('/auth/login', payload, authHeader);
            return {
                data: response.data,
                headers: response.headers['set-cookie'],
            }


        } catch (err) {
            handelAxiosError(err)
        }
    },
    async revoke(cookies: CookiesSchema) {
        const response = await client.post('/auth/revoke', {}, {
            headers: {
                "X-Internal-Token": env.INTERNAL_API_TOKEN,
                ...(cookies?.refreshToken
                    ? { Cookie: `refreshToken=${cookies.refreshToken}` }
                    : {})
            }
        });
        console.log(response.data);

        return response.data
    }
}