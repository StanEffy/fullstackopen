import { createSlice } from "@reduxjs/toolkit"

const initialState = { type: null, message: "currently no notifications" }

const notificationSlice = createSlice({
	name: "notification",
	initialState,
	reducers: {
		setNotification(state, action) {
			return action.payload
		},
		nullifyNotification() {
			return initialState
		},
	},
})

export const setNotify = (notification) => {
	return async (dispatch) => {
		dispatch(
			setNotification({
				type: notification.type,
				message: notification.message,
			})
		)
	}
}
export const { nullifyNotification, setNotification } =
	notificationSlice.actions

export default notificationSlice.reducer
