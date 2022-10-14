import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button, Card, CardContent, Typography } from "@mui/material"
// import PropTypes from "prop-types"

const SingleUser = () => {
	const id = useParams().id
	const navigate = useNavigate()

	const allPosts = useSelector((state) =>
		state.blogs.filter((b) => b.user.id === id)
	)

	return (
		<Card sx={{ maxWidth: "500px", margin: "20px auto" }}>
			<CardContent>
				<Typography variant={"h6"} textAlign={"center"}>
					List of blogs by
				</Typography>
				{allPosts.map((s) => (
					<Typography
						variant={"body2"}
						key={"story_" + s.id}
						sx={{
							border: "1px solid blue",
							borderRadius: "10px",
							mb: 1,
							p: 0.5,
						}}
					>
						<Typography>Title: {s.title} </Typography>
						<Typography>Likes: {s.likes} </Typography>
					</Typography>
				))}
			</CardContent>

			<Button
				variant={"contained"}
				onClick={() => navigate("/")}
				sx={{ margin: "20px auto", display: "block" }}
			>
				back to all
			</Button>
		</Card>
	)
}
// SingleUser.propTypes = {
// 	author: PropTypes.string,
// }
export default SingleUser
