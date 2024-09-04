import React, { createContext, useState, useContext } from 'react';
import { useStation } from '../hooks/useStation';

const StationContext = createContext();

export const StationProvider = ({ children }) => {
    const { stations, addStation, removeStation, fetchStations } = useStation();

    return (
        <StationContext.Provider value={{ stations, addStation, removeStation, fetchStations }}>
            {children}
        </StationContext.Provider>
    );
};

export const useStationContext = () => {
    const context = useContext(StationContext);
    if (context === undefined) {
        throw new Error('useStationContext must be used within a StationProvider');
    }
    return context;
};