import React, { useEffect } from "react"
import BlogList from "./BlogList/BlogList"
import { Route, Routes } from "react-router-dom"
import UsersView from "./UsersView/UsersView"
import SingleUser from "./UsersView/SingleUser"
import { useSelector } from "react-redux"

const MainPage = () => {
	const blogs = useSelector((state) => state.blogs)
	const blogsSorted = [...blogs].sort((a, b) => b.likes - a.likes)

	useEffect(() => {}, [blogs])

	return (
		<>
			<Routes>
				<Route path={"/"} element={<BlogList blogs={blogsSorted} />} />
				<Route path={"/users/:id"} element={<SingleUser />} />
				<Route path={"/users"} element={<UsersView />} />
			</Routes>
		</>
	)
}

export default MainPage
