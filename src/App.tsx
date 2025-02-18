import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import Login from './pages/auth/Login';
import Callback from './pages/auth/Callback';
import ProtectedRoute from './components/shared/ProtectedRoute';
import {queryClient} from "./lib/query-client.ts";

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/auth/callback" element={<Callback />} />

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        {/*<Route element={<Layout />}>*/}
                            {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                            {/*<Route path="/endpoints" element={<EndpointList />} />*/}
                            {/*<Route path="/endpoints/:id" element={<EndpointDetail />} />*/}
                            {/*<Route path="/webhooks" element={<WebhookList />} />*/}
                            {/*<Route path="/webhooks/:id" element={<WebhookDetail />} />*/}
                        {/*</Route>*/}
                    </Route>

                    {/* Redirect to dashboard if logged in, otherwise to login */}
                    {/*<Route path="*" element={<Navigate to="/dashboard" replace />} />*/}
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

export default App;