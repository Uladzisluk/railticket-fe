import React, { createContext, useState, useContext, useEffect } from 'react';
import apiUtils from '../utils/apiUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await apiUtils.get('/api/Auth/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (err) {
                    console.error('Authorization verification error:', err);
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const handleLogin = async (credentials) => {
        setLoading(true);
        try {
            const response = await apiUtils.post('/api/Auth/login', credentials);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            setError(null);
        } catch (err) {
            setError('Login error. Please check your details.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (credentials) => {
        setLoading(true);
        try {
            const response = await apiUtils.post('/api/Auth/register', credentials);
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
            setError(null);
        } catch (err) {
            setError('Registration error. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
