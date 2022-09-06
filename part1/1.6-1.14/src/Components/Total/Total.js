import React from 'react';

const Total = ({all, average, positive}) => {
    return (
        <div>
            {all > 0 ?<p>All {all}</p>:null}
            {all > 0 ? <p>average {average}</p> : null}
            {all > 0 ? <p>positive {positive * 100}%</p> : null}
        </div>
    );
};

export default Total;
