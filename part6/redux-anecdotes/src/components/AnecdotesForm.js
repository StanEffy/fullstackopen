import React, {useRef} from 'react';
import {addNewAnecdote} from "../actionCreators/action-creators";
import { useDispatch } from 'react-redux'
const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const add = (anecdote) => {
        dispatch(addNewAnecdote(anecdote))
    }
    const anec = useRef()

    const handleAdd = (e) => {
        e.preventDefault()
        add(anec.current.value)
        anec.current.value = ""
    }
    return (
        <>
            <h2>create new</h2>
            <form>
                <div><input ref={anec}/></div>
                <button onClick={(e) => handleAdd(e)}>create</button>
            </form>
        </>

    );
};

export default AnecdotesForm;
