import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleUser = () => {
	const id = useParams().id
	const navigate = useNavigate()

	const allPosts = useSelector((state) =>
		state.blogs.filter((b) => b.user.id === id)
	)
	console.log(allPosts)
	return (
		<div>
			{allPosts.map((s) => (
				<p key={"story_" + s.id}>
					<span>Author: {s.author} </span>
					<span>Title: {s.title} </span>
					<span>Likes: {s.likes} </span>
				</p>
			))}
			<button onClick={() => navigate("/")}>back to all</button>
		</div>
	)
}

export default SingleUser
