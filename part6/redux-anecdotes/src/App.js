
import AnecdotesForm from "./components/AnecdotesForm";
import AnecdoteList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import {initializeAnecs} from "./reducers/anecdoteReducer";
import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"

const App = () => {
    const dispatch = useDispatch()

    useEffect( () => {
      dispatch(initializeAnecs())
    }, [dispatch])

  return (
    <div>
        <Router>
            <Notification />
            <Routes>
                <Route path={"/"} element={<AnecdoteList />}/>
                <Route path={"/form"} element={<AnecdotesForm /> }/>
            </Routes>
            <Filter />
        </Router>



    </div>
  )
}

export default App
