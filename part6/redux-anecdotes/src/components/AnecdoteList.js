import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {voteForAnec} from "../actionCreators/action-creators";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const [sortedAnecs, setSortedAnecs] = useState([...anecdotes])
    
    useEffect(() => {
        setSortedAnecs([...anecdotes].sort((a,b) => b.votes - a.votes))
    }, [anecdotes])
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteForAnec(id))
    }
    return (
        <>
            {sortedAnecs.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>

    );
};

export default AnecdoteList;
