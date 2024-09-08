import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useRoutes = () => {
    const handleAddRoute = useCallback(async (newRouteData) => {
        const response = await apiUtils.sendRequestWithCorrelationId('/Routes', newRouteData);
        return response.data;
    }, []);

    const handleDeleteRoute = useCallback(async (routeId) => {
        await apiUtils.delRequestWithCorrelationId(`/Routes/${routeId}`);
    }, []);

    return { handleAddRoute, handleDeleteRoute };
};
