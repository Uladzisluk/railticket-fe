import React from 'react';

const TrainDetail = ({ train, onDelete }) => {
    return (
        <div className="train-detail">
            <h3>{train.name} ({train.type})</h3>
            <p>Train ID: {train.id}</p>
            <button onClick={() => onDelete(train.id)}>Delete</button>
        </div>
    );
};

export default TrainDetail;
