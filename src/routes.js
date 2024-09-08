import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import RoutePage from './pages/Routes/RoutePage';
import StationPage from './pages/Stations/StationPage';
import TicketPage from './pages/Tickets/TicketPage';
import TrainPage from './pages/Trains/TrainPage';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const tokenString = localStorage.getItem('token');

    const accessToken = tokenString && tokenString.trim() !== '';
    const isAuthenticated = !!accessToken;

    return isAuthenticated ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<ProtectedRoute element={<HomePage />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/routes" element={<ProtectedRoute element={<RoutePage />} />} />
                <Route path="/stations" element={<ProtectedRoute element={<StationPage />} />} />
                <Route path="/tickets" element={<ProtectedRoute element={<TicketPage />} />} />
                <Route path="/trains" element={<ProtectedRoute element={<TrainPage />} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
