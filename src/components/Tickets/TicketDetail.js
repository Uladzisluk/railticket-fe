import React from 'react';
import './TicketDetail.css'; // Подключаем стили

const TicketDetail = ({ ticket, onDelete }) => {
    return (
        <div className="ticket-detail">
            <h3 className="ticket-title">Passenger: {ticket.passengerName}</h3>
            <div className="ticket-info">
                <p><strong>Train:</strong> {ticket.trainNumber}</p>
                <p><strong>Departure:</strong> {ticket.departureStationName}, {ticket.departureStationCity}, {ticket.departureStationCountry}</p>
                <p><strong>Arrival:</strong> {ticket.arrivalStationName}, {ticket.arrivalStationCity}, {ticket.arrivalStationCountry}</p>
                <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
                <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
                <p><strong>Purchase Date:</strong> {ticket.purchaseDate}</p>
                <p><strong>Seat:</strong> {ticket.seatNumber}</p>
                <p><strong>Status:</strong> {ticket.status}</p>
            </div>
            <button className="delete-button" onClick={() => onDelete(ticket.id)}>Delete</button>
        </div>
    );
};

export default TicketDetail;
