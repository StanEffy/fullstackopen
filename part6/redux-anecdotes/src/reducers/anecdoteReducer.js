import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from "../api"


const initialState = []

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    voteFor(state, action) {
      const id = action.payload
      return state.map(anec => anec.id === id ? {...anec, votes: anec.votes + 1 } : anec)
    },
    setAllAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecs = () => {
  return async dispatch => {
    const anecs = await anecdotesService.getAll()
    dispatch(setAllAnecdotes(anecs))
  }
}

export const addNewAnec = (anec) => {
  return async dispatch => {
    const newAnec = await anecdotesService.addOne(anec)
    dispatch(addAnecdote(newAnec))
  }
}
export const updateAnec = (anec) => {
  return async dispatch => {
    const newAnec = await anecdotesService.updateOne(anec.id, anec)
    dispatch(voteFor(newAnec.id))
  }
}


export const { addAnecdote, voteFor, setAllAnecdotes} = anecdotesSlice.actions
export default anecdotesSlice.reducer
