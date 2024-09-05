import React, { createContext, useState, useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
    const [stations, setStations] = useState([]);

    const fetchStations = useCallback(async () => {
        try {
            const response = await apiUtils.get('api/Station');
            setStations(response.data);
        } catch (error) {
            console.error('Error in receiving stations:', error);
        }
    }, []);

    const addStation = (newStation) => {
        setStations((prevStations) => [...prevStations, newStation]);
    };

    const deleteStation = (stationId) => {
        setStations((prevStations) => prevStations.filter(station => station.id !== stationId));
    };

    return (
        <StationContext.Provider value={{ stations, fetchStations, addStation, deleteStation }}>
            {children}
        </StationContext.Provider>
    );
};
