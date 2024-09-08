import React, { useEffect, useContext } from 'react';
import RouteList from '../../components/Routes/RouteList';
import { RoutesContext } from '../../context/RoutesContext';
import { useRoutes } from '../../hooks/useRoutes';
import '../../App.css';

const RoutePage = () => {
    const { routes, fetchRoutes, changeLoading } = useContext(RoutesContext);
    const { handleAddRoute, handleDeleteRoute } = useRoutes();

    useEffect(() => {
        fetchRoutes();
    }, [fetchRoutes]);

    const handleAddClick = async (newRouteData) => {
        try {
            changeLoading(true);
            await handleAddRoute(newRouteData);
        } catch (error) {
            console.error('Error when adding a route:', error);
        }
    };

    const handleDeleteClick = async (routeId) => {
        try {
            await handleDeleteRoute(routeId);
        } catch (error) {
            console.error('Error when deleting a route:', error);
        }
    };

    return (
        <div className="route-page">
            <h1>Routes</h1>
            {/* List of routes */}
            <RouteList
                routes={routes}
                onDelete={handleDeleteClick}
                onAdd={handleAddClick}
            />
        </div>
    );
};

export default RoutePage;
