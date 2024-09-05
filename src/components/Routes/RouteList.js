import React from 'react';
import RouteDetail from './RouteDetail';

const RouteList = ({ routes, onDelete, onAdd }) => {
    return (
        <div>
            {routes.length > 0 ? (
                routes.map(route => (
                    <RouteDetail key={route.id} route={route} onDelete={onDelete} />
                ))
            ) : (
                <p>Routes not found</p>
            )}
            {/* Button for adding a new route */}
            <button onClick={() => onAdd({ name: 'New route', origin: 'Station A', destination: 'Station B' })}>
                Add route
            </button>
        </div>
    );
};

export default RouteList;
