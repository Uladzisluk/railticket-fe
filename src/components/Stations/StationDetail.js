import React from 'react';

const StationDetail = ({ station, onDelete }) => {
    return (
        <div className="station-detail">
            <h3>{station.name}</h3>
            <p>City: {station.city}</p>
            <p>Country: {station.country}</p>
            <button onClick={() => onDelete(station.id)}>Delete</button>
        </div>
    );
};

export default StationDetail;
