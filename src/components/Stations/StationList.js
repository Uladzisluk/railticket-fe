import React from 'react';
import StationDetail from './StationDetail';

const StationList = ({ stations, onDelete, onAdd }) => {
    return (
        <div>
            <h2>List of stations</h2>
            {stations.length > 0 ? (
                stations.map((station) => (
                    <StationDetail
                        key={station.id}
                        station={station}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <p>Stations not found</p>
            )}
            <button onClick={() => onAdd({ name: 'New station' })}>Add station</button>
        </div>
    );
};

export default StationList;
