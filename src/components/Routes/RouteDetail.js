import React from 'react';

const RouteDetail = ({ route, onDelete }) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete the route "${route.name}"?`)) {
            onDelete(route.id);
        }
    };

    return (
        <div className="route-detail">
            <p>From: {route.departureStation}</p>
            <p>To: {route.arrivalStation}</p>
            <p>Train number: {route.trainNumber}</p>
            <p>Departure time: {route.departureTime}</p>
            <p>Arrival time: {route.arrivalTime}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default RouteDetail;
