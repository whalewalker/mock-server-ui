import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add token to requests
axiosClient.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken)
        config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

// Handle token refresh
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { refreshToken } = useAuthStore.getState();
                if (!refreshToken)
                    throw new Error('No refresh token available');

                // Import here to avoid circular dependency
                const { authApi } = await import('../api/auth');
                const { accessToken, refreshToken: newRefreshToken } = await authApi.refreshToken(refreshToken);

                useAuthStore.setState({ accessToken, refreshToken: newRefreshToken });
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosClient(originalRequest);
            } catch (error) {
                useAuthStore.getState().clearAuth();
                window.location.href = '/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;