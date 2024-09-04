import React, { useEffect } from 'react';
import { useStation } from '../../hooks/useStation';
import StationList from '../../components/Station/StationList';
import './StationPage.css';
import {useStationContext} from "../../context/StationContext";
const StationPage = () => {
    const context = useStationContext();

    useEffect(() => {
        context.fetchStations();
    }, [context.fetchStations]);

    return (
        <div className="station-page">
            <h1>Stations</h1>
            {context.error && <p className="error-message">{context.error}</p>}
            <StationList stations={context.stations} />
        </div>
    );
};

export default StationPage;