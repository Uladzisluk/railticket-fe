import React, {createContext, useState, useCallback, useEffect} from 'react';
import apiUtils from '../utils/apiUtils';
import {connectToRabbitMQ} from "../utils/rabbitMqUtils";

export const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const topicName = 'ticket_exchange';
        const queueName = 'ticket_response';

        connectToRabbitMQ(topicName, queueName, handleRabbitMQMessage);
    }, []);

    const handleRabbitMQMessage = (message) => {
        const { data } = JSON.parse(message.body);
        if (!isFetching) {
            fetchTickets();
        }
        setLoading(false);
    };

    const changeLoading = (newLoading) => {
        setLoading(newLoading);
    }

    const fetchTickets = useCallback(async () => {
        try {
            setIsFetching(true);
            const config = {
                token: localStorage.getItem("token"),
            }
            const response = await apiUtils.get('api/Tickets', config);
            setTickets((prevTickets) => {
                const newTickets = response.data.data;
                if (JSON.stringify(prevTickets) !== JSON.stringify(newTickets)) {
                    return newTickets;
                }
                return prevTickets;
            });
        } catch (error) {
            console.error('An error in the ticketing process:', error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    return (
        <TicketsContext.Provider value={{ tickets, fetchTickets, changeLoading }}>
            {children}
        </TicketsContext.Provider>
    );
};
