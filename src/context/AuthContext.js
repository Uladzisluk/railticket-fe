import React, { createContext, useState} from 'react';
import { useAuth} from "../hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, login, logout] = useAuth();

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};