import React, { useState } from 'react';
import Register from '../../components/Auth/Register';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { handleRegister } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords don\'t match');
            return;
        }

        try {
            await handleRegister({ name, email, password, phone });
            setName('');
            setPhone('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            // Redirect to the login page
            window.location.href = '/login';
        } catch (err) {
            setError('Error during registration. Please try again.');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="register-page">
            <h1>Registration</h1>
            <Register
                name={name}
                phone={phone}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                onNameChange={(e) => setName(e.target.value)}
                onPhoneChange={(e) => setPhone(e.target.value)}
                onEmailChange={(e) => setEmail(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                onSubmit={handleSubmit}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default RegisterPage;
