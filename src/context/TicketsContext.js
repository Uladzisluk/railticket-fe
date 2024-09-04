import React, { createContext, useState, useContext } from 'react';
import { useTickets } from '../hooks/useTickets';

const TicketsContext = createContext();

export const TicketsProvider = ({ children }) => {
    const { tickets, addTicket, removeTicket } = useTickets();

    return (
        <TicketsContext.Provider value={{ tickets, addTicket, removeTicket }}>
            {children}
        </TicketsContext.Provider>
    );
};

export const useTicketsContext = () => {
    const context = useContext(TicketsContext);
    if (context === undefined) {
        throw new Error('useTicketsContext must be used within a TicketsProvider');
    }
    return context;
};