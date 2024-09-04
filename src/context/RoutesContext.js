import React, { createContext, useState, useContext } from 'react';
import { useRoutes } from '../hooks/useRoutes';


const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
    const { routes, addRoute, removeRoute, fetchRoutes } = useRoutes();

    return (
        <RoutesContext.Provider value={{ routes, addRoute, removeRoute, fetchRoutes }}>
            {children}
        </RoutesContext.Provider>
    );
};

export const useRoutesContext = () => {
    const context = useContext(RoutesContext);
    if (context === undefined) {
        throw new Error('useRoutesContext must be used within a RoutesProvider');
    }
    return context;
};