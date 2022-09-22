export const addNewAnecdote = payload => dispatch => dispatch({type: "anecdotes/addAnecdote", payload})
export const voteForAnec = payload => dispatch => dispatch({type: "anecdotes/voteFor", payload })
