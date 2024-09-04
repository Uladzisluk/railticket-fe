import React, { useState } from 'react';
import Login from '../../components/Auth/Login';
import './LoginPage.css';
import {useAuthContext} from "../../context/AuthContext";

const LoginPage = () => {
    const context = useAuthContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        context.login(email, password);
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <Login
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default LoginPage;