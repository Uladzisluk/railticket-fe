import React, {createContext, useState, useCallback, useEffect} from 'react';
import apiUtils from '../utils/apiUtils';
import {connectToRabbitMQ} from "../utils/rabbitMqUtils";

export const StationContext = createContext();

export const StationProvider = ({ children }) => {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const queueName = 'station_response';

        connectToRabbitMQ(queueName, handleRabbitMQMessage);
    }, []);

    const handleRabbitMQMessage = (message) => {
        const { data } = JSON.parse(message.body);
        console.log(data);
        if (!isFetching) {
            fetchStations();
        }
        setLoading(false);
    };

    const changeLoading = (newLoading) => {
        setLoading(newLoading);
    }

    const fetchStations = useCallback(async () => {
        try {
            setIsFetching(true);
            const config = {
                token: localStorage.getItem("token"),
            }
            const response = await apiUtils.get('api/Station', config);
            setStations((prevStations) => {
                const newStations = response.data.data;
                if (JSON.stringify(prevStations) !== JSON.stringify(newStations)) {
                    return newStations;
                }
                return prevStations;
            });
        } catch (error) {
            console.error('Error in receiving stations:', error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    const addStation = (newStation) => {
        setStations((prevStations) => [...prevStations, newStation]);
    };

    const deleteStation = (stationId) => {
        setStations((prevStations) => prevStations.filter(station => station.id !== stationId));
    };

    return (
        <StationContext.Provider value={{ stations, fetchStations, changeLoading }}>
            {children}
        </StationContext.Provider>
    );
};
