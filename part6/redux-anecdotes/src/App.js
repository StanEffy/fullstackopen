
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {initializeAnecs} from "./reducers/anecdoteReducer";

const App = () => {
    const dispatch = useDispatch()

    useEffect( () => {
      dispatch(initializeAnecs())
    }, [dispatch])

  return (
    <div>
        <Notification />
      <h2>Anecdotes</h2>
        <AnecdoteList />
        <Filter />
      <AnecdotesForm />

    </div>
  )
}

export default App
