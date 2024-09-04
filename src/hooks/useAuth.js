import { useState } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        try {
            // Здесь можно вызвать API для входа
            // Например:
            // const response = await authService.login(email, password);
            // setUser(response.user);

            // Заглушка: для примера
            setUser({ email });
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    const logout = () => {
        // Здесь можно вызвать API для выхода
        // Например:
        // await authService.logout();

        setUser(null);
    };

    return { user, login, logout };
};