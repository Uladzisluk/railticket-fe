import React from 'react';
import AppRoutes from './routes';
import {AuthProvider} from './context/AuthContext';
import {RoutesProvider} from './context/RoutesContext';
import {StationProvider} from './context/StationContext';
import {TicketsProvider} from './context/TicketsContext';
import {TrainsProvider} from './context/TrainsContext';

import './App.css';

function App() {
    return (
        <AuthProvider>
            <RoutesProvider>
                <StationProvider>
                    <TicketsProvider>
                        <TrainsProvider>
                            <div className="app">
                                <AppRoutes/>
                            </div>
                        </TrainsProvider>
                    </TicketsProvider>
                </StationProvider>
            </RoutesProvider>
        </AuthProvider>
    );
}

export default App;