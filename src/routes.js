import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import RoutePage from './pages/Routes/RoutePage';
import StationPage from './pages/Stations/StationPage';
import TicketPage from './pages/Tickets/TicketPage';
import TrainPage from './pages/Trains/TrainPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/routes" element={<RoutePage/>} />
                <Route path="/stations" element={<StationPage/>} />
                <Route path="/tickets" element={<TicketPage/>} />
                <Route path="/trains" element={<TrainPage/>} />
                {/* Another route */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
