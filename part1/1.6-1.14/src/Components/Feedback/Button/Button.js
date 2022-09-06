import React from 'react';

const Button = ({handleClick, title}) => {
    return (
        <button onClick={() => handleClick((prev) => prev +1)}>
            {title}
        </button>
    );
};

export default Button;
