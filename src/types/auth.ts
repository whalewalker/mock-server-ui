export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    setTokens: (tokens: { accessToken: string; refreshToken: string }) => void;
    clearAuth: () => void;
}