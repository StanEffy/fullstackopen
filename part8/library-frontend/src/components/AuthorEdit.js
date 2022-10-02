import React, {useRef} from 'react';
import { useMutation } from "@apollo/client";
import {EDIT_AUTHOR} from "../queries";

const AuthorEdit = ({name, born, handleUpdate}) => {





    return (
        <form onSubmit={handleUpdate}>
            <h4>Edit existing author burthyear by clicking on the name</h4>
            <label>name
                <input type="text" ref={name} readOnly={true}/></label>
            <label>born
                <input type="number" ref={born}/></label>
            <button type="submit" >update author</button>
            {/*{error ? <p>{error}</p>: null}*/}
        </form>
    );
};

export default AuthorEdit;
