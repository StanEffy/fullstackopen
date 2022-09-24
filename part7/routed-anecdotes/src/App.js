import { useState } from 'react'
import Menu from "./Menu";
import AnecdoteList from "./AnecdotesList";
import About from "./About";
import CreateNew from "./CreateNew";
import Footer from "./Footer";
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import SingleAnec from "./SingleAnec";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {

    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path={"/anecdotes"} element={<AnecdoteList anecdotes={anecdotes} />}/>
        <Route path={"/anecdotes/:id"} element={<SingleAnec anecdotes={anecdotes}/>}/>
        <Route path={"/create"} element={<CreateNew addNew={addNew} />}/>
        <Route path={"/about"} element={<About />}/>
      </Routes>



      <Footer /></Router>
    </div>
  )
}

export default App
