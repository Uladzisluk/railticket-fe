import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const HomePage = () => {
    const [fromStation, setFromStation] = useState('');
    const [toStation, setToStation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const navigate = useNavigate();
    const { handleLogout } = useAuth();

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/routes', { state: { fromStation, toStation, date, time } });
    };

    const handleLogOutClick = () => {
        handleLogout();
        navigate('/login');
    };

    return (
        <div className="home-page">
            <button className="logout-button" onClick={handleLogOutClick}>Log Out</button>

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

                    <button type="submit" className="search-button">Search Routes</button>
                </form>
            </main>
        </div>
    );
};

export default HomePage;
