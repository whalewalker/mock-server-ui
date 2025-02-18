import axiosClient from "../lib/axios-client.ts";
import { AuthResponse } from "../types/auth";

export const authApi = {
    authenticateWithOAuth: async (
        provider: 'google' | 'github',
        oauthToken: string
    ): Promise<AuthResponse> => {
        const { data } = await axiosClient.post('/api/auth/oauth', {
            provider,
            token: oauthToken,
        });
        return data;
    },

    refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
        const { data } = await axiosClient.post('/api/auth/refresh-token', {
            refreshToken,
        });
        return data;
    },

    logout: async (): Promise<void> => {
        await axiosClient.post('/api/auth/logout');
    }
};