import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Callback: React.FC = () => {
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            // Send the token to the parent window (login page)
            if (window.opener) {
                try {
                    // Important: Use the frontend URL here, not the API URL
                    window.opener.postMessage({ token }, import.meta.env.VITE_APP_URL);
                    console.log("Token sent to opener window");
                    setTimeout(() => window.close(), 1000); // Give it a moment to send the message
                } catch (error) {
                    console.error("Failed to send message to opener:", error);
                    // Fallback if postMessage fails
                    window.opener.location.href = `${import.meta.env.VITE_APP_URL}/login?token=${token}`;
                    window.close();
                }
            } else {
                // If no opener (direct navigation), redirect to login page with token
                window.location.href = `/login?token=${token}`;
            }
        } else {
            console.error("No token received from OAuth provider");
            // If no token was received, redirect to login page
            window.location.href = '/login';
        }
    }, [searchParams]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-xl font-medium">Authentication in progress...</h1>
                <p className="mt-2 text-gray-600">Please wait while we complete the authentication process.</p>
            </div>
        </div>
    );
};

export default Callback;