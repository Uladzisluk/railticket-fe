import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';
import apiUtils from '../utils/apiUtils';

const HomePage = () => {
    const [fromStation, setFromStation] = useState('');
    const [toStation, setToStation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [stations, setStations] = useState([]);
    const [filteredFromStations, setFilteredFromStations] = useState([]);
    const [filteredToStations, setFilteredToStations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    useEffect(() => {
        const fetchStations = async () => {
            setIsLoading(true);
            try {
                const config = {
                    token: localStorage.getItem('token'),
                };
                const response = await apiUtils.get('/api/Station', config);
                const data = await response.data.data;
                setStations(data);
            } catch (error) {
                console.error('Error fetching stations:', error);
            }
            setIsLoading(false);
        };

        fetchStations();
    }, []);

    useEffect(() => {
        if (fromStation) {
            setFilteredFromStations(
                stations
                    .filter(station => station.name.toLowerCase().includes(fromStation.toLowerCase()))
                    .slice(0, 5)
            );
        } else {
            setFilteredFromStations([]);
        }
    }, [fromStation, stations]);

    useEffect(() => {
        if (toStation) {
            setFilteredToStations(
                stations
                    .filter(station => station.name.toLowerCase().includes(toStation.toLowerCase()))
                    .slice(0, 5)
            );
        } else {
            setFilteredToStations([]);
        }
    }, [toStation, stations]);

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/routes', { state: { fromStation, toStation, date, time } });
    };

    const handleLogOutClick = () => {
        handleLogout();
        navigate('/login');
    };

    const handleSelectFromStation = (station) => {
        setFromStation(station.name);
        setFilteredFromStations([]);
    };

    const handleSelectToStation = (station) => {
        setToStation(station.name);
        setFilteredToStations([]);
    };
    
    const handleNavigateToTickets = () => {
        navigate('/tickets');
    };

    return (
        <div className="home-page">
            <button className="logout-button" onClick={handleLogOutClick}>Log Out</button>
            <button className="view-tickets-button" onClick={handleNavigateToTickets}>My Tickets</button>

            <main className="main-content">
                <h2>Book Your Train Ticket</h2>
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label htmlFor="fromStation">From:</label>
                        <input
                            type="text"
                            id="fromStation"
                            value={fromStation}
                            onChange={(e) => setFromStation(e.target.value)}
                            required
                            placeholder="Departure Station"
                        />
                        {filteredFromStations.length > 0 && (
                            <ul className="station-options">
                                {filteredFromStations.map((station) => (
                                    <li key={station.id} onClick={() => handleSelectFromStation(station)}>
                                        {station.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="toStation">To:</label>
                        <input
                            type="text"
                            id="toStation"
                            value={toStation}
                            onChange={(e) => setToStation(e.target.value)}
                            required
                            placeholder="Destination Station"
                        />
                        {filteredToStations.length > 0 && (
                            <ul className="station-options">
                                {filteredToStations.map((station) => (
                                    <li key={station.id} onClick={() => handleSelectToStation(station)}>
                                        {station.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date:</label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Time:</label>
                        <input
                            type="time"
                            id="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="search-button" disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search Routes'}
                    </button>
                </form>
            </main>
        </div>
    );
};

export default HomePage;
