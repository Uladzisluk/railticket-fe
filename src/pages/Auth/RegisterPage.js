import React, { useState } from 'react';
import Register from '../../components/Auth/Register';
import { useAuth } from '../../hooks/useAuth';
import './RegisterPage.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            // Выводим сообщение об ошибке, если пароли не совпадают
            alert('Passwords do not match!');
            return;
        }
        register(email, password);
    };

    return (
        <div className="register-page">
            <h1>Register</h1>
            <Register
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default RegisterPage;