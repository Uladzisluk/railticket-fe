import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useStation = () => {
    const handleAddStation = useCallback(async (newStationData) => {
        const config = {
            token: localStorage.getItem("token"),
        }
        const response = await apiUtils.sendRequestWithCorrelationId('/api/Station', newStationData, config);
        return response.data;
    }, []);

    const handleDeleteStation = useCallback(async (stationId) => {
        const config = {
            token: localStorage.getItem("token"),
        }
        await apiUtils.delRequestWithCorrelationId(`/api/Station/${stationId}`, config);
    }, []);

    return { handleAddStation, handleDeleteStation };
};
