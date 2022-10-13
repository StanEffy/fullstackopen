import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { voteBlog, addCommentToBlog } from "../../store/blogsReducer"
import { setNotify } from "../../store/notificationReducer"

const SingleBlogPost = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const blogs = useSelector((state) => state.blogs)
	const blog = blogs.find((b) => b.id === id)
	const comment = useRef()
	const handleLike = async (blog) => {
		try {
			dispatch(voteBlog(blog))
		} catch (e) {
			dispatch(
				setNotify({ type: "error", message: e.response.data.error })
			)
		}
	}
	const handleAddComment = async () => {
		try {
			console.log(comment.current.value)
			dispatch(addCommentToBlog(id, comment.current.value))
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
			<input type={"text"} name={"comment"} ref={comment} />
			<button onClick={() => handleAddComment()}>add comment</button>
			{blog.comments ? (
				<ul>
					{blog.comments.map((c, i) => (
						<li key={id + "-comments-" + i}>{c}</li>
					))}
				</ul>
			) : null}
		</div>
	)
}

export default SingleBlogPost
