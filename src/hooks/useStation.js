import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useStation = () => {
    const handleAddStation = useCallback(async (newStationData) => {
        const response = await apiUtils.post('/api/Station', newStationData);
        return response.data;
    }, []);

    const handleDeleteStation = useCallback(async (stationId) => {
        await apiUtils.delete(`/api/Station/${stationId}`);
    }, []);

    return { handleAddStation, handleDeleteStation };
};
