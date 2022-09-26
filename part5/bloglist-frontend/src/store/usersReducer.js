import { createSlice } from "@reduxjs/toolkit"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { setNotify } from "./notificationReducer"
const initialState = null

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action) {
			return action.payload
		},
		logout(state, action) {
			return action.payload
		},
	},
})

export const dispatchUser = (credentials) => {
	return async (dispatch) => {
		try {
			const res = await loginService.login(credentials)
			await blogService.setToken(res.token)
			dispatch(setUser(res))
		} catch (e) {
			dispatch(
				setNotify({ message: e.response.data.error, type: "error" })
			)
		}
	}
}

export const dispatchLogout = () => {
	return async (dispatch) => {
		dispatch(logout(null))
	}
}

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer
