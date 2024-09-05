import React, { createContext, useState, useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
    const [routes, setRoutes] = useState([]);

    const fetchRoutes = useCallback(async () => {
        try {
            const response = await apiUtils.get('/Routes');
            setRoutes(response.data);
        } catch (error) {
            console.error('Error when receiving routes:', error);
        }
    }, []);

    const addRoute = (newRoute) => {
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    };
    
    const deleteRoute = (routeId) => {
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== routeId));
    };

    return (
        <RoutesContext.Provider value={{ routes, fetchRoutes, addRoute, deleteRoute }}>
            {children}
        </RoutesContext.Provider>
    );
};
