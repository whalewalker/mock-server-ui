import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from "../types/auth";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            setTokens: ({ accessToken, refreshToken }) => set({ accessToken, refreshToken }),
            clearAuth: () => set({ accessToken: null, refreshToken: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);