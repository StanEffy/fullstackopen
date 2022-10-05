import React, {useRef} from 'react';

const Form = ({name, number, handleSubmit}) => {

    return (
        <form>
            <div>
                name: <input ref={name}/>
            </div>
            <div>number: <input ref={number}/></div>
            <div>
                <button type="submit" onClick={(e) => handleSubmit(e)}>add</button>
            </div>
        </form>
    );
};

export default Form;
