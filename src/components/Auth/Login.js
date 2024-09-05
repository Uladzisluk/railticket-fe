import React from 'react';

const Login = ({ email, password, onEmailChange, onPasswordChange, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="login-form">
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={onEmailChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={onPasswordChange}
                    required
                />
            </div>
            <button type="submit">Sign in</button>
        </form>
    );
};

export default Login;
