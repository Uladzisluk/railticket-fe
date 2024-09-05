import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useRoutes = () => {
    const handleAddRoute = useCallback(async (newRouteData) => {
        const response = await apiUtils.post('/Routes', newRouteData);
        return response.data;
    }, []);

    const handleDeleteRoute = useCallback(async (routeId) => {
        await apiUtils.delete(`/Routes/${routeId}`);
    }, []);

    return { handleAddRoute, handleDeleteRoute };
};
