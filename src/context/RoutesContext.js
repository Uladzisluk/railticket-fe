import React, {createContext, useState, useCallback, useEffect} from 'react';
import apiUtils from '../utils/apiUtils';
import {connectToRabbitMQ} from "../utils/rabbitMqUtils";

export const RoutesContext = createContext();

export const RoutesProvider = ({ children }) => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const topicName = 'ticket_exchange';
        const queueName = 'ticket_response';

        connectToRabbitMQ(topicName, queueName, handleRabbitMQMessage);
    }, []);

    const handleRabbitMQMessage = (message) => {
        const { data } = JSON.parse(message.body);
        console.log(message);
        if (!isFetching) {
            fetchRoutes();
        }
        setLoading(false);
    };

    const changeLoading = (newLoading) => {
        setLoading(newLoading);
    }

    const fetchRoutes = useCallback(async () => {
        try {
            setIsFetching(true);
            const config = {
                token: localStorage.getItem("token"),
            }
            const response = await apiUtils.get('api/Routes', config);
            setRoutes((prevRoutes) => {
                const newRoutes = response.data.data;
                if (JSON.stringify(prevRoutes) !== JSON.stringify(newRoutes)) {
                    return newRoutes;
                }
                return prevRoutes;
            });
        } catch (error) {
            console.error('Error when receiving routes:', error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    const addRoute = (newRoute) => {
        setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    };
    
    const deleteRoute = (routeId) => {
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== routeId));
    };

    return (
        <RoutesContext.Provider value={{ routes, fetchRoutes, changeLoading }}>
            {children}
        </RoutesContext.Provider>
    );
};
