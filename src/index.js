// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


import { AuthProvider } from './context/AuthContext';
import { RoutesProvider } from './context/RoutesContext';
import { StationProvider } from './context/StationContext';
import { TicketsProvider } from './context/TicketsContext';
import { TrainsProvider } from './context/TrainsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <AuthProvider>
            <RoutesProvider>
                <StationProvider>
                    <TicketsProvider>
                        <TrainsProvider>
                            <App />
                        </TrainsProvider>
                    </TicketsProvider>
                </StationProvider>
            </RoutesProvider>
        </AuthProvider>
    </React.StrictMode>
);