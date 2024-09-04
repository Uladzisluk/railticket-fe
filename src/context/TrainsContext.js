import React, { createContext, useState, useContext } from 'react';
import { useTrains } from './useTrains';

const TrainsContext = createContext();

export const TrainsProvider = ({ children }) => {
    const { trains, addTrain, removeTrain } = useTrains();

    return (
        <TrainsContext.Provider value={{ trains, addTrain, removeTrain }}>
            {children}
        </TrainsContext.Provider>
    );
};

export const useTrainsContext = () => {
    const context = useContext(TrainsContext);
    if (context === undefined) {
        throw new Error('useTrainsContext must be used within a TrainsProvider');
    }
    return context;
};