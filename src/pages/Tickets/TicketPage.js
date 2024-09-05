import React, { useEffect, useContext } from 'react';
import TicketList from '../../components/Tickets/TicketList';
import { TicketsContext } from '../../context/TicketsContext';
import { useTickets } from '../../hooks/useTickets';
import '../../App.css';

const TicketPage = () => {
    const { tickets, fetchTickets, addTicket, deleteTicket } = useContext(TicketsContext);
    const { handleAddTicket, handleDeleteTicket } = useTickets();

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleAddClick = async (newTicketData) => {
        try {
            const addedTicket = await handleAddTicket(newTicketData);
            addTicket(addedTicket);
        } catch (error) {
            console.error('Error when adding a ticket:', error);
        }
    };

    const handleDeleteClick = async (ticketId) => {
        try {
            await handleDeleteTicket(ticketId);
            deleteTicket(ticketId);
        } catch (error) {
            console.error('Error when deleting a ticket:', error);
        }
    };

    return (
        <div className="ticket-page">
            <h1>Tickets</h1>
            {/* List of tickets */}
            <TicketList
                tickets={tickets}
                onDelete={handleDeleteClick}
                onAdd={handleAddClick}
            />
        </div>
    );
};

export default TicketPage;
