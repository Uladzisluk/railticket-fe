import React, { useEffect } from 'react';
import RouteList from '../../components/Routes/RouteList';
import './RoutePage.css';
import {useRoutesContext} from "../../context/RoutesContext";

const RoutePage = () => {
    const context = useRoutesContext();

    useEffect(() => {
        context.fetchRoutes();
    }, [context.fetchRoutes]);

    return (
        <div className="route-page">
            <h1>Routes</h1>
            <RouteList routes={context.routes} />
        </div>
    );
};

export default RoutePage;