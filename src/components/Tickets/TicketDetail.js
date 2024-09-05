import React from 'react';

const TicketDetail = ({ ticket, onDelete }) => {
    return (
        <div className="ticket-detail">
            <h3>Ticket in the name: {ticket.passengerName}</h3>
            <p>Ticket ID: {ticket.id}</p>
            <p>Train: {ticket.trainId}</p>
            <p>Seat: {ticket.seat}</p>
            <button onClick={() => onDelete(ticket.id)}>Delete</button>
        </div>
    );
};

export default TicketDetail;
