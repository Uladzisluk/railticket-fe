import React, { useEffect, useContext } from 'react';
import TicketList from '../../components/Tickets/TicketList';
import { TicketsContext } from '../../context/TicketsContext';
import { useTickets } from '../../hooks/useTickets';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';
import './TicketPage.css';

const TicketPage = () => {
    const { tickets, fetchTickets, changeLoading } = useContext(TicketsContext);
    const { handleAddTicket, handleDeleteTicket } = useTickets();
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    const handleAddClick = async (newTicketData) => {
        try {
            changeLoading(true);
            await handleAddTicket(newTicketData);
        } catch (error) {
            console.error('Error when adding a ticket:', error);
        }
    };

    const handleDeleteClick = async (ticketId) => {
        try {
            await handleDeleteTicket(ticketId);
        } catch (error) {
            console.error('Error when deleting a ticket:', error);
        }
    };

    const handleLogoutClick = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <div className="ticket-page">
            <div className="header">
                <button onClick={handleLogoutClick} className="logout-button">Logout</button>
            </div>
            <h1 className="ticket-page-title">Tickets</h1>

            <div className="ticket-list-container">
                {tickets && tickets.length > 0 ? (
                    <TicketList
                        tickets={tickets}
                        onDelete={handleDeleteClick}
                        onAdd={handleAddClick}
                    />
                ) : (
                    <div className="no-tickets">
                        <p>You have no bought tickets</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TicketPage;
