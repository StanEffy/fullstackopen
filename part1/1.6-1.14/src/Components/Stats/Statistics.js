import React from 'react';
import StatisticLine from "./StatisticLine";

const Statistics = ({all, good, neutral, bad}) => {
    return (
        <div>
            <h2>statistics</h2>
            {all > 0 ? <table>
                <StatisticLine text={"good"} value={good}/>
                <StatisticLine text={"neutral"} value={neutral}/>
                <StatisticLine text={"bad"} value={bad}/>
           </table> : <p>No feedback given</p>}
        </div>
    );
};

export default Statistics;
