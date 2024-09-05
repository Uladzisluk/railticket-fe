import React from 'react';
import TicketDetail from './TicketDetail';

const TicketList = ({ tickets, onDelete, onAdd }) => {
    return (
        <div>
            <h2>List of tickets</h2>
            {tickets.length > 0 ? (
                tickets.map((ticket) => (
                    <TicketDetail
                        key={ticket.id}
                        ticket={ticket}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <p>Tickets not found</p>
            )}
            <button onClick={() => onAdd({ passengerName: 'Ivan', trainId: 1, seat: '12B' })}>
                Add ticket
            </button>
        </div>
    );
};

export default TicketList;
