import React, { useEffect, useContext } from 'react';
import TrainList from '../../components/Trains/TrainList';
import { TrainsContext } from '../../context/TrainsContext';
import { useTrains } from '../../hooks/useTrains';
import '../../App.css';

const TrainPage = () => {
    const { trains, fetchTrains, changeLoading } = useContext(TrainsContext);
    const { handleAddTrain, handleDeleteTrain } = useTrains();

    useEffect(() => {
        fetchTrains();
    }, [fetchTrains]);

    const handleAddClick = async (newTrainData) => {
        try {
            changeLoading(true);
            await handleAddTrain(newTrainData);
        } catch (error) {
            console.error('Error when adding a train:', error);
        }
    };

    const handleDeleteClick = async (trainId) => {
        try {
            await handleDeleteTrain(trainId);
        } catch (error) {
            console.error('Error when deleting a train:', error);
        }
    };

    return (
        <div className="train-page">
            <h1>Trains</h1>
            {/* List of trains */}
            <TrainList
                trains={trains}
                onDelete={handleDeleteClick}
                onAdd={handleAddClick}
            />
        </div>
    );
};

export default TrainPage;
