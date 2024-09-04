import {useCallback, useState} from 'react';
import { fetchRoutesFromAPI } from '../utils/apiUtils';

export const useRoutes = () => {
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState(null);

    const addRoute = (route) => {
        setRoutes((prevRoutes) => [...prevRoutes, route]);
    };

    const removeRoute = (routeId) => {
        setRoutes((prevRoutes) => prevRoutes.filter(route => route.id !== routeId));
    };

    const fetchRoutes = useCallback(async () => {
        try {
            const data = await fetchRoutesFromAPI();
            setRoutes(data);
        } catch (err) {
            setError('Failed to fetch routes.');
        }
    }, []);

    return { routes, addRoute, removeRoute, fetchRoutes };
};