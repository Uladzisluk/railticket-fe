import React, { createContext, useState, useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
    const [tickets, setTickets] = useState([]);

    const fetchTickets = useCallback(async () => {
        try {
            const response = await apiUtils.get('/api/Tickets');
            setTickets(response.data);
        } catch (error) {
            console.error('An error in the ticketing process:', error);
        }
    }, []);

    const addTicket = (newTicket) => {
        setTickets((prevTickets) => [...prevTickets, newTicket]);
    };

    const deleteTicket = (ticketId) => {
        setTickets((prevTickets) => prevTickets.filter(ticket => ticket.id !== ticketId));
    };

    return (
        <TicketsContext.Provider value={{ tickets, fetchTickets, addTicket, deleteTicket }}>
            {children}
        </TicketsContext.Provider>
    );
};
