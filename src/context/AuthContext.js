import React, { createContext, useState, useContext, useEffect } from 'react';
import apiUtils from '../utils/apiUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const handleLogin = async (credentials) => {
        const config = {
            token: 'null',
        }
        const response = await apiUtils.post('/api/Auth/login', credentials, config);
        console.log(response.data.data);
        const data = response.data.data;
        const status = response.data.status;
        if(status === 200){
            localStorage.setItem('token', data);
            setError(null);
        }else{
            setError('Login failed. User doesn\'t exist or bad credentials.');
        }
    };

    const handleRegister = async (credentials) => {
        try {
            const config = {
                token: 'null',
            }
            const response = await apiUtils.post('/api/Auth/register', credentials, config);
            console.log(response.body);
            setError(null);
        } catch (err) {
            setError('Registration error. Please try again.');
            console.error('Registration error:', err);
        } finally {
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ error, handleLogin, handleRegister, handleLogout, setError }}>
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
