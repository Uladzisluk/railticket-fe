import React from 'react';
import TrainDetail from './TrainDetail';

const TrainList = ({ trains, onDelete, onAdd }) => {
    return (
        <div>
            <h2>List of trains</h2>
            {trains.length > 0 ? (
                trains.map((train) => (
                    <TrainDetail
                        key={train.id}
                        train={train}
                        onDelete={onDelete}
                    />
                ))
            ) : (
                <p>Trains not found</p>
            )}
            <button onClick={() => onAdd({ name: 'New train', number: '151608' })}>
                Add train
            </button>
        </div>
    );
};

export default TrainList;
