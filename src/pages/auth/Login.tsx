import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from '../../components/ui/button';
import {authApi} from '../../api/auth';
import {useAuthStore} from '../../store/authStore';
import {queryClient} from '../../lib/query-client.ts';
import {FaGoogle, FaGithub} from 'react-icons/fa';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const setTokens = useAuthStore((state) => state.setTokens);

    const handleGoogleLogin = async () => {
        const googleWindow = window.open(
            `${import.meta.env.VITE_API_URL}/auth/google`,
            'Google OAuth',
            'width=600,height=600'
        );

        if (!googleWindow) {
            alert("Popup was blocked. Please allow popups for this site to use OAuth login.");
            return;
        }

        window.addEventListener('message', async (event) => {
            if (event.origin !== import.meta.env.VITE_APP_URL) return;

            if (event.data.token) {
                try {
                    const response = await authApi.authenticateWithOAuth('google', event.data.token);
                    setTokens(response);
                    queryClient.invalidateQueries();
                    navigate('/dashboard');
                } catch (error) {
                    console.error('Authentication failed:', error);
                }
            }
        }, {once: true});
    };

    const handleGithubLogin = async () => {
        const githubWindow = window.open(
            `${import.meta.env.VITE_API_URL}/auth/github`,
            'GitHub OAuth',
            'width=600,height=600'
        );

        if (!githubWindow) {
            alert("Popup was blocked. Please allow popups for this site to use OAuth login.");
            return;
        }

        window.addEventListener('message', async (event) => {
            if (event.origin !== import.meta.env.VITE_APP_URL) return;

            if (event.data.token) {
                try {
                    const response = await authApi.authenticateWithOAuth('github', event.data.token);
                    setTokens(response);
                    await queryClient.invalidateQueries();
                    navigate('/dashboard');
                } catch (error) {
                    console.error('Authentication failed:', error);
                }
            }
        }, {once: true});
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h1 className="text-3xl font-bold">Sign In</h1>
                    <p className="mt-2 text-gray-600">Sign in to your account to continue</p>
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-2 py-2"
                        variant="outline"
                    >
                        <FaGoogle className="w-5 h-5"/>
                        Sign in with Google
                    </Button>

                    <Button
                        onClick={handleGithubLogin}
                        className="w-full flex items-center justify-center gap-2 py-2"
                        variant="outline"
                    >
                        <FaGithub className="w-5 h-5"/>
                        Sign in with GitHub
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Login;