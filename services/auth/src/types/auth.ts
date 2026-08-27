export interface RegisterInputs {
    email: string,
    password: string,
    displayName: string
}



export interface LoginInputs {
    email: string,
    password: string
}


export interface UserData {
    id: string,
    email: string,
    displayName: string
    created_at: Date,

}

export interface AuthTokens {
    accessToken: string,
    refreshToken: string
}

export interface AuthResponse extends AuthTokens {
    user: UserData
}

export interface RefreshToken {
    userId: string,
    tokenId: string,
    expiresAt: Date
}