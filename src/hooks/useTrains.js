import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useTrains = () => {
    const handleAddTrain = useCallback(async (newTrainData) => {
        const response = await apiUtils.sendRequestWithCorrelationId('/api/Trains', newTrainData);
        return response.data;
    }, []);

    const handleDeleteTrain = useCallback(async (trainId) => {
        await apiUtils.delRequestWithCorrelationId(`/api/Trains/${trainId}`);
    }, []);

    return { handleAddTrain, handleDeleteTrain };
};
