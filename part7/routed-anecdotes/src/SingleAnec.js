import React from 'react';
import {useParams} from "react-router-dom";

const SingleAnec = ({anecdotes}) => {
    const id = useParams().id
    const anec = anecdotes.find(a => a.id == id)
    return (
        <div>
            <p>{anec.content}</p>
            <p>It has {anec.votes} likes</p>
        </div>
    );
};

export default SingleAnec;
