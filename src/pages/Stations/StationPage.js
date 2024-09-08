// /pages/Station/StationPage.js

import React, { useEffect, useContext } from 'react';
import StationList from '../../components/Stations/StationList';
import { StationContext } from '../../context/StationContext';
import { useStation } from '../../hooks/useStation';
import '../../App.css';

const StationPage = () => {
    const { stations, fetchStations, changeLoading } = useContext(StationContext);
    const { handleAddStation, handleDeleteStation } = useStation();

    useEffect(() => {
        fetchStations();
    }, [fetchStations]);

    const handleAddClick = async (newStationData) => {
        try {
            changeLoading(true);
            await handleAddStation(newStationData);
        } catch (error) {
            console.error('Error when adding a station:', error);
        }
    };

    const handleDeleteClick = async (stationId) => {
        try {
            await handleDeleteStation(stationId);
        } catch (error) {
            console.error('Error when deleting a station:', error);
        }
    };

    return (
        <div className="station-page">
            <h1>Stations</h1>
            {/* List of stations */}
            <StationList
                stations={stations}
                onDelete={handleDeleteClick}
                onAdd={handleAddClick}
            />
        </div>
    );
};

export default StationPage;
