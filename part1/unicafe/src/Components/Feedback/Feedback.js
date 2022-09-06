import React from 'react';
import Button from "./Button/Button";

const Feedback = ({setNeutral, setBad, setGood}) => {
    return (
        <div>
            <h2>Give feedback</h2>
            <Button handleClick={setGood} title={"good"}/>
            <Button handleClick={setNeutral} title={"neutral"}/>
            <Button handleClick={setBad} title={"bad"}/>
        </div>
    );
};

export default Feedback;
