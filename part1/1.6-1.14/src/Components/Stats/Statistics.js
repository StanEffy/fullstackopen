import React from 'react';

const Statistics = ({good, neutral, bad}) => {
    return (
        <div>
            <h2>statistics</h2>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
        </div>
    );
};

export default Statistics;
