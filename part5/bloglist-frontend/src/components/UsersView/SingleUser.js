import React from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleUser = () => {
	const id = useParams().id
	const navigate = useNavigate()
	console.log(id)
	const allPosts = useSelector((state) =>
		state.blogs.filter((b) => b.user.id === id)
	)
	console.log(allPosts)
	return (
		<div>
			{allPosts.map((s) => (
				<p key={"story_" + s.id}>{s.title}</p>
			))}
			<button onClick={() => navigate("/")}>back to all</button>
		</div>
	)
}

export default SingleUser
