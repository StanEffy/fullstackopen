import { useState, useEffect } from "react"
import React from "react"
import blogService from "./services/blogs"
import LoginForm from "./components/LoginForm/LoginForm"
import BlogForm from "./components/BlogForm/BlogForm"
import Anouncement from "./components/Anouncement/Anouncement"
import BlogList from "./components/BlogList/BlogList"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "./store/blogsReducer"
import UsersView from "./components/UsersView/UsersView"
import { dispatchLogout, dispatchUser } from "./store/usersReducer"
import { Route, Routes } from "react-router-dom"
import SingleUser from "./components/UsersView/SingleUser"

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(initializeBlogs())
	}, [dispatch])

	const blogs = useSelector((state) => state.blogs)
	const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const user = useSelector((state) => state.user)

	const [notification, setNotification] = useState(null)

	useEffect(() => {}, [blogs])

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
			console.log(exception)
			setNotification({
				message: exception.response.data.error,
				type: "error",
			})
		}
	}
	const logout = () => {
		dispatch(dispatchLogout())
	}
	useEffect(() => {
		if (notification) {
			const timeoutId = setTimeout(() => {
				setNotification(null)
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
				<>
					<div>
						Well, <b>{user.username}</b> is definitely logged in
					</div>
					<button onClick={() => logout()}>logout</button>
				</>
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
				<>
					<BlogForm setNotification={setNotification} />
					<BlogList
						blogs={blogsSorted}
						setNotification={setNotification}
					/>
					<Routes>
						<Route path={"/"} element={<UsersView />} />
						<Route path={"/users/:id"} element={<SingleUser />} />
					</Routes>
				</>
			)}
		</div>
	)
}

export default App
