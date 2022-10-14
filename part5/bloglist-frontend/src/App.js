import { useState, useEffect } from "react"
import React from "react"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm/LoginForm"

import Anouncement from "./components/Anouncement/Anouncement"

import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./store/blogsReducer"

import { dispatchLogout, dispatchUser } from "./store/usersReducer"

import { nullifyNotificationD, setNotify } from "./store/notificationReducer"
import MainPage from "./components/MainPage"
import Header from "./components/Header/Header"
import Button from "@mui/material/Button"

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const user = useSelector((state) => state.user)
	const notification = useSelector((state) => state.notification)

	useEffect(() => {
		if (user) {
			blogService.setToken(user.token)
		}
	}, [])

	const handleLogin = async (event) => {
		event.preventDefault()
		try {
			dispatch(dispatchUser({ username, password }))

			setUsername("")
			setPassword("")
		} catch (exception) {
			dispatch(
				setNotify({
					message: exception.response.data.error,
					type: "error",
				})
			)
		}
	}
	const logout = () => {
		dispatch(dispatchLogout())
	}
	useEffect(() => {
		console.log(notification)
		if (notification) {
			const timeoutId = setTimeout(() => {
				dispatch(nullifyNotificationD())
			}, 4000)
			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [notification])

	return (
		<div>
			{notification ? (
				<Anouncement
					type={notification.type}
					message={notification.message}
				/>
			) : null}
			{user && (
				<div
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<Header username={user.username} logout={logout} />
				</div>
			)}
			{user === null ? (
				<LoginForm
					handleLogin={handleLogin}
					username={username}
					password={password}
					setPassword={setPassword}
					setUsername={setUsername}
				/>
			) : (
				<MainPage setNotification={setNotify} />
			)}
		</div>
	)
}

export default App
