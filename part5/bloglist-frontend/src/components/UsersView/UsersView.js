import React, { useEffect, useState } from "react"
import usersServise from "../../services/login"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const UsersView = () => {
	const [users, setUsers] = useState([])

	const loggedInUser = useSelector((state) => state.user)

	useEffect(() => {
		usersServise.users().then((res) => setUsers(res))
	}, [])
	if (!loggedInUser) return null
	return (
		<div>
			<h3>Users view</h3>
			{users.map((u) => {
				return u.blogs.length ? (
					<Link to={`/users/${u.id}`} key={u.id}>
						{u.username} with {u.blogs.length} blogposts
					</Link>
				) : (
					<p key={u.id}>
						{u.username} with {u.blogs.length} blogposts
					</p>
				)
			})}
		</div>
	)
}

export default UsersView
