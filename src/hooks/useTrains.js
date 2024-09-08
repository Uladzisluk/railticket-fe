import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useTrains = () => {
    const handleAddTrain = useCallback(async (newTrainData) => {
        const config = {
            token: localStorage.getItem("token"),
        }
        const response = await apiUtils.sendRequestWithCorrelationId('/api/Trains', newTrainData, config);
        return response.data;
    }, []);

    const handleDeleteTrain = useCallback(async (trainId) => {
        const config = {
            token: localStorage.getItem("token"),
        }
        await apiUtils.delRequestWithCorrelationId(`/api/Trains/${trainId}`, config);
    }, []);

    return { handleAddTrain, handleDeleteTrain };
};
