import React from 'react';

const RouteDetail = ({ route, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the route "${route.name}"?`)) {
            onDelete(route.id);
        }
    };

    return (
        <div className="route-detail">
            <h3>{route.name}</h3>
            <p>From: {route.origin}</p>
            <p>To: {route.destination}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default RouteDetail;
