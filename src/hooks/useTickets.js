import { useState } from 'react';

export const useTickets = () => {
    const [tickets, setTickets] = useState([]);

    const addTicket = (ticket) => {
        setTickets((prevTickets) => [...prevTickets, ticket]);
    };
    
    const removeTicket = (ticketId) => {
        setTickets((prevTickets) => prevTickets.filter(ticket => ticket.id !== ticketId));
    };

    return { tickets, addTicket, removeTicket };
};