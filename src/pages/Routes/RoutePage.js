import React, { useEffect, useState, useRef } from 'react';
import RouteList from '../../components/Routes/RouteList';
import apiUtils from '../../utils/apiUtils';
import '../../App.css';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import { connectToRabbitMQ } from "../../utils/rabbitMqUtils";

Modal.setAppElement('#root');

const RoutePage = () => {
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [availableSeats, setAvailableSeats] = useState([]);

    const selectedRouteIdRef = useRef(null);
    const availableSeatsRef = useRef([]);

    const { state } = useLocation();
    const { fromStation, toStation, date, time } = state || {};

    useEffect(() => {
        const fetchRoutes = async () => {
            setLoading(true);
            try {
                const config = {
                    token: localStorage.getItem('token'),
                };
                const response = await apiUtils.get('/api/Routes', config);
                const data = response.data.data;

                const filtered = data.filter(route =>
                    route.departureStation === fromStation &&
                    route.arrivalStation === toStation &&
                    new Date(`${date}T${route.departureTime}`).getTime() >= new Date(`${date}T${time}`).getTime()
                );

                setRoutes(filtered);
                setFilteredRoutes(filtered);
            } catch (error) {
                console.error('Error fetching routes:', error);
            }
            setLoading(false);
        };

        fetchRoutes();
    }, [fromStation, toStation, date, time]);

    useEffect(() => {
        const topicName = 'ticket_exchange';
        const queueName = 'ticket_response';

        if (selectedRouteIdRef.current !== null) {
            connectToRabbitMQ(topicName, queueName, handleRabbitMQMessage);
        }

        return () => {

        };
    }, [selectedRouteIdRef.current]);

    const handleRabbitMQMessage = (message) => {
        const { data } = JSON.parse(message.body);
        console.log(message);

        if (data.RouteId === selectedRouteIdRef.current && data.BookingDate === date) {
            availableSeatsRef.current = availableSeatsRef.current.filter(seat => seat !== data.SeatNumber);
            setAvailableSeats(availableSeatsRef.current);
        }
        setLoading(false);
    };

    const handleBuyTicketClick = async (routeId, departureTime, arrivalTime) => {
        selectedRouteIdRef.current = routeId;
        setDepartureTime(departureTime);
        setArrivalTime(arrivalTime);

        const topicName = 'ticket_exchange';
        const queueName = 'ticket_response';
        connectToRabbitMQ(topicName, queueName, handleRabbitMQMessage);

        try {
            const config = {
                token: localStorage.getItem('token'),
            };

            const trainResponse = await apiUtils.get(`/api/Routes/$${routeId}/Train`, config);
            const totalSeats = trainResponse.data.data.totalSeats;

            const bookingsResponse = await apiUtils.get(`/api/Routes/$${routeId}/Bookings`, config);
            let bookings = Array.from(bookingsResponse.data.data).filter(booking => booking.bookingDate === date) || [];

            const bookedSeats = new Set(bookings.map(booking => booking.seatNumber));
            const availableSeats = Array.from({ length: totalSeats }, (_, i) => i + 1).filter(seat => !bookedSeats.has(seat));

            availableSeatsRef.current = availableSeats;
            setAvailableSeats(availableSeats);
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error fetching train or booking data:', error);
        }
    };

    const handleSeatClick = (seat) => {
        setSelectedSeat(seat);
    };

    const handleTicketPurchase = async () => {
        if (selectedSeat) {
            try {
                const config = {
                    token: localStorage.getItem('token'),
                };

                const payload = {
                    routeId: selectedRouteIdRef.current,
                    seatNumber: selectedSeat,
                    date: date,
                };
                await apiUtils.sendRequestWithCorrelationId(`/api/Tickets/BuyTicket`, payload, config);

                alert(`Ticket for seat ${selectedSeat} purchased successfully!`);
                closeModal();
            } catch (error) {
                console.error('Error purchasing ticket:', error);
                alert('Failed to purchase ticket.');
            }
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedSeat(null);
    };

    return (
        <div className="route-page">
            <h1>Available Routes</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="route-container">
                    {filteredRoutes.length > 0 ? (
                        <div className="route-list">
                            {filteredRoutes.map(route => (
                                <div key={route.id} className="route-item">
                                    <div className="route-details">
                                        <p><strong>Train Number:</strong> {route.trainNumber}</p>
                                        <div className="route-time">
                                            <div>
                                                <strong>Departure:</strong>
                                                <p>{route.departureStation}</p>
                                                <p>{route.departureTime}</p>
                                            </div>
                                            <div>
                                                <strong>Arrival:</strong>
                                                <p>{route.arrivalStation}</p>
                                                <p>{route.arrivalTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        className="buy-ticket-button"
                                        onClick={() => handleBuyTicketClick(route.id, route.departureTime, route.arrivalTime)}
                                    >
                                        Buy Ticket
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No routes found</p>
                    )}
                </div>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Available Seats"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>Available Seats</h2>
                <button onClick={closeModal} className="modal-close-button">Close</button>
                <div className="available-seats-container">
                    {availableSeats.length > 0 ? (
                        <div className="available-seats-list">
                            {availableSeats.map(seat => (
                                <div
                                    key={seat}
                                    className={`seat-item ${selectedSeat === seat ? 'selected' : ''}`}
                                    onClick={() => handleSeatClick(seat)}
                                >
                                    Seat {seat}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No seats available</p>
                    )}
                </div>

                {selectedSeat && (
                    <div className="ticket-info">
                        <h3>Ticket Information</h3>
                        <p><strong>Route:</strong> {fromStation} - {toStation}</p>
                        <p><strong>Date:</strong> {date}</p>
                        <p><strong>Time:</strong> {departureTime} - {arrivalTime}</p>
                        <p><strong>Selected Seat:</strong> {selectedSeat}</p>
                        <button className="buy-ticket-button" onClick={handleTicketPurchase}>
                            Buy
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default RoutePage;
