import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/auth';

export const useAuth = () => {
    const navigate = useNavigate();
    const { accessToken, refreshToken, setTokens, clearAuth } = useAuthStore();

    const isAuthenticated = !!accessToken;

    useEffect(() => {
        if (!accessToken && refreshToken) {
            const refreshAccessToken = async () => {
                try {
                    const response = await authApi.refreshToken(refreshToken);
                    setTokens(response);
                } catch (error) {
                    console.error('Failed to refresh access token:', error);
                    clearAuth();
                    navigate('/login');
                }
            };

            refreshAccessToken();
        }
    }, [accessToken, refreshToken, setTokens, clearAuth, navigate]);

    const logout = async () => {
        try {
            await authApi.logout();
        } finally {
            clearAuth();
            navigate('/login');
        }
    };

    return {
        isAuthenticated,
        logout
    };
};

export default useAuth;