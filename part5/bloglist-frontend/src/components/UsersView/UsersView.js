import React, { useEffect, useState } from "react"
import usersServise from "../../services/login"
const UsersView = () => {
	const [users, setUsers] = useState([])

	useEffect(() => {
		usersServise.users().then((res) => setUsers(res))
	}, [])

	return (
		<div>
			<h3>Users view</h3>
			{users.map((u) => (
				<p key={u.id}>
					{u.username} with {u.blogs.length} blogposts
				</p>
			))}
		</div>
	)
}

export default UsersView
