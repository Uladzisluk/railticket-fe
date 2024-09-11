import React from 'react';
import TicketDetail from './TicketDetail';
import './TicketList.css'; // Стили для списка билетов

const TicketList = ({ tickets, onDelete, onAdd }) => {
    return (
        <div className="ticket-list">
            {tickets.map((ticket) => (
                <TicketDetail
                    key={ticket.id}
                    ticket={ticket}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TicketList;
