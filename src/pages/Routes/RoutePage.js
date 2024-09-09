import React, { useEffect, useState } from 'react';
import RouteList from '../../components/Routes/RouteList';
import apiUtils from '../../utils/apiUtils';
import '../../App.css';
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RoutePage = () => {
    const [routes, setRoutes] = useState([]);
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRouteId, setSelectedRouteId] = useState(null);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

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

    const handleBuyTicketClick = async (routeId) => {
        setSelectedRouteId(routeId);
        setModalIsOpen(true);

        try {
            const config = {
                token: localStorage.getItem('token'),
            };

            const trainResponse = await apiUtils.get(`/api/Routes/$${routeId}/Train`, config);
            const totalSeats = trainResponse.data.data.totalSeats;

            const bookingsResponse = await apiUtils.get(`/api/Routes/$${routeId}/Bookings`, config);
            let bookings = bookingsResponse.data.data || [];

            const bookedSeats = new Set(bookings.map(booking => booking.seatNumber));
            const availableSeats = Array.from({ length: totalSeats }, (_, i) => i + 1).filter(seat => !bookedSeats.has(seat));

            setAvailableSeats(availableSeats);
        } catch (error) {
            console.error('Error fetching train or booking data:', error);
        }
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setAvailableSeats([]);
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
                                        onClick={() => handleBuyTicketClick(route.id)}
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
                                <div key={seat} className="seat-item">
                                    Seat {seat}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No seats available</p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default RoutePage;
