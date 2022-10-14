import React, { useEffect, useState } from "react"
import usersServise from "../../services/login"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Box, Typography } from "@mui/material"
const UsersView = () => {
	const [users, setUsers] = useState([])

	const loggedInUser = useSelector((state) => state.user)

	useEffect(() => {
		usersServise.users().then((res) => setUsers(res))
	}, [])
	if (!loggedInUser) return null
	return (
		<Box sx={{ p: 1 }}>
			<Typography variant={"h3"}>Users view</Typography>
			{users.map((u) => {
				return u.blogs.length ? (
					<Typography variant={"body1"} key={u.id + "-users-view"}>
						<Link
							style={{
								color: "blue",
								textDecoration: "none",
								fontWeight: "bold",
							}}
							to={`/users/${u.id}`}
						>
							{u.username} with {u.blogs.length} blogposts
						</Link>
					</Typography>
				) : (
					<Typography variant={"body1"} key={u.id + "-users-view"}>
						{u.username} with {u.blogs.length} blogposts
					</Typography>
				)
			})}
		</Box>
	)
}

export default UsersView
