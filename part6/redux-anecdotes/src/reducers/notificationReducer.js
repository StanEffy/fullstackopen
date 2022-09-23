import {createSlice} from "@reduxjs/toolkit";

const initialState = { type: null, message: "No notification here"}

const notificationReducer = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            return notification
        },
        nullifyNotification(){
            return {type: null, message: "No notification here"}
        }
    }
})
export const {setNotification, nullifyNotification} = notificationReducer.actions
export default notificationReducer.reducer
