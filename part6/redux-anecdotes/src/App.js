import { useSelector, useDispatch } from 'react-redux'
import {useEffect, useRef, useState} from "react";

const App = () => {
  const anecdotes = useSelector(state => state)
    const [sortedAnecs, setSortedAnecs] = useState([...anecdotes])
    useEffect(() => {
        setSortedAnecs(anecdotes.sort((a,b) => b.votes - a.votes))
    }, [anecdotes])
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({type: "VOTE", payload: id})
  }
  const add = (anecdote) => {
      dispatch({type: "ADD", payload: anecdote})
  }
    const anec = useRef()
    
    const handleAdd = (e) => {
      e.preventDefault()
        add(anec.current.value)
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
      <h2>create new</h2>
      <form>
        <div><input ref={anec}/></div>
        <button onClick={(e) => handleAdd(e)}>create</button>
      </form>
    </div>
  )
}

export default App
