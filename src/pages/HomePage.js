import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Welcome to the Rail Ticket app!</h1>
            <p>Select one of the following sections:</p>
            <nav>
                <ul>
                    <li>
                        <Link to="/routes">Routes</Link>
                    </li>
                    <li>
                        <Link to="/stations">Stations</Link>
                    </li>
                    <li>
                        <Link to="/tickets">Tickets</Link>
                    </li>
                    <li>
                        <Link to="/trains">Trains</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;
