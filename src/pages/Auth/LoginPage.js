import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../../components/Auth/Login';
import { useAuth } from '../../context/AuthContext';
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
            setError(null);
            window.location.href = '/';
        } catch (err) {
            setError('Login failed. User doesn\'t exist or bad credentials.');
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

            <p>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginPage;
