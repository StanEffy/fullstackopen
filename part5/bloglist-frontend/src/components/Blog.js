import React, { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { deletePost, voteBlog } from "../store/blogsReducer"
import { setNotify } from "../store/notificationReducer"

const Blog = ({ blog }) => {
	const dispatch = useDispatch()

	const [detailsVisibility, setDetailsVisibility] = useState(false)
	const handleDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete this post")) {
			try {
				dispatch(deletePost(id))
			} catch (e) {
				dispatch(
					setNotify({
						type: "error",
						message: e.response.data.error,
					})
				)
			}
		}
	}
	const handleLike = async (blog) => {
		try {
			dispatch(voteBlog(blog))
		} catch (e) {
			dispatch(
				setNotify({ type: "error", message: e.response.data.error })
			)
		}
	}
	return (
		<li
			style={{ border: "1px solid black", padding: "5px" }}
			className={"blog-unit"}
		>
			<div>
				<div>
					<span>{blog.title}</span>
					<span className={".blog-author"}>{blog.author}</span>
				</div>
				{!detailsVisibility ? (
					<button onClick={() => setDetailsVisibility(true)}>
						view
					</button>
				) : null}
			</div>
			{detailsVisibility ? (
				<div>
					<div className={"blog-url"}>{blog.url}</div>
					<div>
						<span className={"blog-likes"}>likes {blog.likes}</span>
						<button
							className={"blog__like-button"}
							onClick={() => handleLike(blog)}
						>
							like!
						</button>
					</div>
					<button onClick={() => setDetailsVisibility(false)}>
						hide
					</button>
					<button
						className={"post-deletion-button"}
						onClick={() => handleDelete(blog.id)}
					>
						remove the blogpost
					</button>
				</div>
			) : null}
		</li>
	)
}
Blog.propTypes = {
	blog: PropTypes.shape({
		likes: PropTypes.number,
		url: PropTypes.string,
		author: PropTypes.string,
		id: PropTypes.string,
		title: PropTypes.string,
	}),
}
export default Blog
