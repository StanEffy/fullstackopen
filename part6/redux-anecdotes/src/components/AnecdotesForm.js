import React, {useRef} from 'react';
import {connect} from 'react-redux'
import {addNewAnec} from "../reducers/anecdoteReducer";

const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdotesForm = (props) => {

    const add = (anecdote) => {
        const obj = {content: anecdote, id: getId(), votes: 0}
        props.addNewAnec(obj)
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
const mapStateToProps = () => {
}
const mapDispatchToProps = {
    addNewAnec
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdotesForm);
