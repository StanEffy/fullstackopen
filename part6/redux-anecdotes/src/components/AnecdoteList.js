import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setNewNotification, setNullNotification, voteForAnec} from "../actionCreators/action-creators";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const [sortedAnecs, setSortedAnecs] = useState([...anecdotes])
    const notification = useSelector(state => state.notification)

    useEffect(() => {
        setSortedAnecs([...anecdotes].sort((a,b) => b.votes - a.votes))
    }, [anecdotes])
    const dispatch = useDispatch()

    useEffect(() => {
        if (notification) {
            const timeoutId = setTimeout(() => {
                dispatch(setNullNotification())
            }, 4000)
            return () => {
                clearTimeout(timeoutId)
            }
        }
    }, [notification])

    const vote = (anecdote) => {
        dispatch(voteForAnec(anecdote.id))
        dispatch(setNewNotification({type: "success", message:`You voted "${anecdote.content}"`
    }))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>

    );
};

export default AnecdoteList;
