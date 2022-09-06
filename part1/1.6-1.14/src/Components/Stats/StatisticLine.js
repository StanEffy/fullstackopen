import React from 'react';

const StatisticLine = ({text, value}) => {
    return (
        <tr>
           <th>{text}</th><td>{value}</td>
        </tr>
    );
};

export default StatisticLine;
