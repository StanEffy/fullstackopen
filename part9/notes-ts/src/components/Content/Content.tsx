import React from 'react';

const Content = ({name, count}: {name: string, count: number}) => {
    return (
        <p>
            {name} {count}
        </p>
    );
};

export default Content;