import {useCallback, useState} from 'react';
import {fetchRoutesFromAPI, fetchStationsFromAPI} from "../utils/apiUtils";

export const useStation = () => {
    const [stations, setStations] = useState([]);
    const [error, setError] = useState(null);

    const addStation = (station) => {
        setStations((prevStations) => [...prevStations, station]);
    };

    const removeStation = (stationId) => {
        setStations((prevStations) => prevStations.filter(station => station.id !== stationId));
    };

    const fetchStations = useCallback(async () => {
        try {
            const data = await fetchStationsFromAPI();
            setStations(data);
        } catch (err) {
            setError('Failed to fetch stations.');
        }
    }, []);

    return { stations, addStation, removeStation, fetchStations };
};