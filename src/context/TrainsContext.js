import React, { createContext, useState, useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const TrainsContext = createContext();

export const TrainsProvider = ({ children }) => {
    const [trains, setTrains] = useState([]);

    const fetchTrains = useCallback(async () => {
        try {
            const response = await apiUtils.get('/api/Trains');
            setTrains(response.data);
        } catch (error) {
            console.error('Error when receiving trains:', error);
        }
    }, []);

    const addTrain = (newTrain) => {
        setTrains((prevTrains) => [...prevTrains, newTrain]);
    };

    const deleteTrain = (trainId) => {
        setTrains((prevTrains) => prevTrains.filter(train => train.id !== trainId));
    };

    return (
        <TrainsContext.Provider value={{ trains, fetchTrains, addTrain, deleteTrain }}>
            {children}
        </TrainsContext.Provider>
    );
};
