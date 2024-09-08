import React, {createContext, useState, useCallback, useEffect} from 'react';
import apiUtils from '../utils/apiUtils';
import { connectToRabbitMQ } from '../utils/rabbitMqUtils';

export const TrainsContext = createContext();

export const TrainsProvider = ({ children }) => {
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        const queueName = 'train_response';

        connectToRabbitMQ(queueName, handleRabbitMQMessage);
    }, []);

    const handleRabbitMQMessage = (message) => {
        const { data } = JSON.parse(message.body);
        console.log(data);
        if (!isFetching) {
            fetchTrains();
        }
        setLoading(false);
    };

    const changeLoading = (newLoading) => {
        setLoading(newLoading);
    }

    const fetchTrains = useCallback(async () => {
        try {
            setIsFetching(true);
            const config = {
                token: localStorage.getItem("token"),
            }
            const response = await apiUtils.get('api/Trains', config);
            setTrains((prevTrains) => {
                const newTrains = response.data.data;
                if (JSON.stringify(prevTrains) !== JSON.stringify(newTrains)) {
                    return newTrains;
                }
                return prevTrains;
            });
        } catch (error) {
            console.error('Error when receiving trains:', error);
        } finally {
            setIsFetching(false);
        }
    }, []);

    const addTrain = (newTrain) => {
        setTrains((prevTrains) => [...prevTrains, newTrain]);
    };

    const deleteTrain = (trainId) => {
        setTrains((prevTrains) => prevTrains.filter(train => train.id !== trainId));
    };

    return (
        <TrainsContext.Provider value={{ trains, fetchTrains, changeLoading }}>
            {children}
        </TrainsContext.Provider>
    );
};
