import { useCallback } from 'react';
import apiUtils from '../utils/apiUtils';

export const useRoutes = () => {
    const handleAddRoute = useCallback(async (newRouteData) => {
        const config = {
            token: localStorage.getItem("token"),
        }
        const response = await apiUtils.sendRequestWithCorrelationId('/api/Routes', newRouteData, config);
        return response.data;
    }, []);

    const handleDeleteRoute = useCallback(async (routeId) => {
        const config = {
            token: localStorage.getItem("token"),
        }
        await apiUtils.delRequestWithCorrelationId(`/api/Routes/${routeId}`, config);
    }, []);

    return { handleAddRoute, handleDeleteRoute };
};
