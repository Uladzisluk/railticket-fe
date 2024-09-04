import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoutesProvider } from './context/RoutesContext';
import { StationProvider } from './context/StationContext';
import { TicketsProvider } from './context/TicketsContext';
import { TrainsProvider } from './context/TrainsContext';

import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import RoutePage from './pages/Routes/RoutePage';
import StationPage from './pages/Station/StationPage';
import TicketPage from './pages/Tickets/TicketPage';
import TrainPage from './pages/Trains/TrainPage';

import './App.css';

function App() {
  return (
      <Router>
        <AuthProvider>
          <RoutesProvider>
            <StationProvider>
              <TicketsProvider>
                <TrainsProvider>
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/routes" element={<RoutePage />} />
                    <Route path="/stations" element={<StationPage />} />
                    <Route path="/tickets" element={<TicketPage />} />
                    <Route path="/trains" element={<TrainPage />} />
                  </Routes>
                </TrainsProvider>
              </TicketsProvider>
            </StationProvider>
          </RoutesProvider>
        </AuthProvider>
      </Router>
  );
}

export default App;