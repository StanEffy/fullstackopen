import React from 'react';

const Total = ({all, average, positive}) => {
    return (
        <table>
            {all > 0 ? <tr><th>All</th><td>{all}</td></tr>:null}
            {all > 0 ? <tr><th>Average</th><td>{average}</td></tr> : null}
            {all > 0 ? <tr><th>Positive</th><td>{positive * 100}%</td></tr> : null}
        </table>
    );
};

export default Total;
