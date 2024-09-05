import React from 'react';
import Routes from './routes';
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
                                <Routes/>
                            </div>
                        </TrainsProvider>
                    </TicketsProvider>
                </StationProvider>
            </RoutesProvider>
        </AuthProvider>
    );
}

export default App;