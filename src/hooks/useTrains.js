import { useState } from 'react';

export const useTrains = () => {
    const [trains, setTrains] = useState([]);

    const addTrain = (train) => {
        setTrains((prevTrains) => [...prevTrains, train]);
    };
    
    const removeTrain = (trainId) => {
        setTrains((prevTrains) => prevTrains.filter(train => train.id !== trainId));
    };

    return { trains, addTrain, removeTrain };
};