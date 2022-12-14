import {useEffect, useState} from 'react'
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);}
const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))

  const handleClick = () => {
    setSelected(getRandomArbitrary(0, anecdotes.length))
}
const handleVote = () => {
    const newArr = [...votes]
    newArr[selected] += 1
    setVotes(newArr)
}
  return (
      <div>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <button onClick={() => handleVote()}>vote</button>
        <button onClick={() => handleClick()}>random anec</button>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[votes.indexOf(Math.max.apply(null,votes))]}</p>
      </div>
  )
}

export default App
