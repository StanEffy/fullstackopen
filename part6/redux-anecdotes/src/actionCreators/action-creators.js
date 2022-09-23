export const addNewAnecdote = payload => dispatch => dispatch({type: "anecdotes/addAnecdote", payload})
export const voteForAnec = payload => dispatch => dispatch({type: "anecdotes/voteFor", payload })

export const setFilter = payload=> dispatch => dispatch({type: "filter/setFilter", payload})
//notification action creators

export const setNewNotification = payload => dispatch => dispatch({type: "notification/setNotification", payload})
export const setNullNotification = () => dispatch => dispatch({type: "notification/nullifyNotification"})
