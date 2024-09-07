import React from 'react';

const TicketDetail = ({ticket, onDelete}) => {
    return (
        <div className="ticket-detail">
            <h3>Ticket in the name: {ticket.passengerName}</h3>
            <p>Train: {ticket.trainNumber}</p>
            <p>Departure
                station: {ticket.departureStationName}, {ticket.departureStationCity}, {ticket.departureStationCountry}</p>
            <p>Arrival
                station: {ticket.arrivalStationName}, {ticket.arrivalStationCity}, {ticket.arrivalStationCountry}</p>
            <p>Departure time: {ticket.departureTime}</p>
            <p>Arrival time: {ticket.arrivalTime}</p>
            <p>Purchase date: {ticket.purchaseDate}</p>
            <p>Seat: {ticket.seatNumber}</p>
            <p>Status: {ticket.status}</p>
            <button onClick={() => onDelete(ticket.id)}>Delete</button>
        </div>
    );
};

export default TicketDetail;
