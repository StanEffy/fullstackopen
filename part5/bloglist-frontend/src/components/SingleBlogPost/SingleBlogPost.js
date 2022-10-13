import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { voteBlog } from "../../store/blogsReducer"
import { setNotify } from "../../store/notificationReducer"

const SingleBlogPost = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const blogs = useSelector((state) => state.blogs)
	const blog = blogs.find((b) => b.id === id)

	const handleLike = async (blog) => {
		try {
			dispatch(voteBlog(blog))
		} catch (e) {
			dispatch(
				setNotify({ type: "error", message: e.response.data.error })
			)
		}
	}
	if (!blog) return <p>There is no such blog</p>
	return (
		<div>
			<h4>Title: {blog.title}</h4>
			<a href={blog.url}>Link to a blog</a>
			<div>
				<p>{blog.likes} liked it!</p>
				<button onClick={() => handleLike(blog)}>Ay! Me gusto!</button>
			</div>
			<h5>Author: {blog.author}</h5>
		</div>
	)
}

export default SingleBlogPost
