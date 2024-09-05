// /pages/Auth/LoginPage.js

import React, { useState } from 'react';
import Login from '../../components/Auth/Login';
import { useAuth } from '../../hooks/useAuth';
import '../../App.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { handleLogin } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await handleLogin({ email, password });
            setEmail('');
            setPassword('');
            // Redirect to the home page
            window.location.href = '/';
        } catch (err) {
            setError('Invalid email or password');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="login-page">
            <h1>Log in</h1>
            <Login
                email={email}
                password={password}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onSubmit={handleSubmit}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default LoginPage;
