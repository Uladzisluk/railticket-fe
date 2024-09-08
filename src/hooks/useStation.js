import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useStation = () => {
    const handleAddStation = useCallback(async (newStationData) => {
        const response = await apiUtils.sendRequestWithCorrelationId('/api/Station', newStationData);
        return response.data;
    }, []);

    const handleDeleteStation = useCallback(async (stationId) => {
        await apiUtils.delRequestWithCorrelationId(`/api/Station/${stationId}`);
    }, []);

    return { handleAddStation, handleDeleteStation };
};
