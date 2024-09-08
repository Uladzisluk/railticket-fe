import React from 'react';

const Register = ({
                      name,
                      phone,
                      email,
                      password,
                      confirmPassword,
                      onNameChange,
                      onPhoneChange,
                      onEmailChange,
                      onPasswordChange,
                      onConfirmPasswordChange,
                      onSubmit
                  }) => {
    return (
        <form onSubmit={onSubmit} className="register-form">
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={onNameChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={onPhoneChange}
                    required
                />
            </div>
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
            <div>
                <label htmlFor="confirmPassword">Confirm the password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={onConfirmPasswordChange}
                    required
                />
            </div>
            <button type="submit">Sign up</button>
        </form>
    );
};

export default Register;
