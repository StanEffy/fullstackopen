import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setNewNotification, setNullNotification, voteForAnec} from "../actionCreators/action-creators";
import anecdotesService from "../api"
import {updateAnec} from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const [sortedAnecs, setSortedAnecs] = useState([...anecdotes])
    const notification = useSelector(state => state.notification)
    const filter = useSelector(state => state.filter)

    useEffect(() => {
        setSortedAnecs([...anecdotes].filter(a => a.content.includes(filter)).sort((a,b) => b.votes - a.votes))
    }, [anecdotes, filter])

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

    const vote = async (anecdote) => {
        dispatch(updateAnec({...anecdote, votes: anecdote.votes +1}))
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
