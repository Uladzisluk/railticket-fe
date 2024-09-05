import React from 'react';

const StationDetail = ({ station, onDelete }) => {
    return (
        <div className="station-detail">
            <h3>{station.name}</h3>
            <p>Station ID: {station.id}</p>
            <button onClick={() => onDelete(station.id)}>Delete</button>
        </div>
    );
};

export default StationDetail;
