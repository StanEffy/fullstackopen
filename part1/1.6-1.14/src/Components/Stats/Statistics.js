import React from 'react';

const Statistics = ({all, good, neutral, bad}) => {
    return (
        <div>
            <h2>statistics</h2>
            {all > 0 ? <>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
           </> : <p>No feedback given</p>}
        </div>
    );
};

export default Statistics;
