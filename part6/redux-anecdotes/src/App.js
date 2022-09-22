import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useState} from "react";
import {voteForAnec} from "./actionCreators/action-creators";
import AnecdotesForm from "./components/AnecdotesForm";

const App = () => {
  const anecdotes = useSelector(state => state)
    const [sortedAnecs, setSortedAnecs] = useState([...anecdotes])
    useEffect(() => {
        setSortedAnecs(anecdotes.sort((a,b) => b.votes - a.votes))
    }, [anecdotes])
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteForAnec(id))
  }



  return (
    <div>
      <h2>Anecdotes</h2>
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
      <AnecdotesForm />

    </div>
  )
}

export default App
