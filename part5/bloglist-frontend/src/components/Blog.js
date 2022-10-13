import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
// import { useDispatch } from "react-redux"
// import { deletePost, voteBlog } from "../store/blogsReducer"
// import { setNotify } from "../store/notificationReducer"

const Blog = ({ blog }) => {
	// const dispatch = useDispatch()

	// const handleDelete = async (id) => {
	// 	if (window.confirm("Are you sure you want to delete this post")) {
	// 		try {
	// 			dispatch(deletePost(id))
	// 			dispatch(
	// 				setNotify({
	// 					type: "success",
	// 					message: `Blog with ${id} was succesfully deleted, nice job`,
	// 				})
	// 			)
	// 		} catch (e) {
	// 			dispatch(
	// 				setNotify({
	// 					type: "error",
	// 					message: e.response.data.error,
	// 				})
	// 			)
	// 		}
	// 	}
	// }
	return (
		<li
			style={{ border: "1px solid black", padding: "5px" }}
			className={"blog-unit"}
		>
			<Link to={`/blogs/${blog.id}`}>
				<div>
					<span>{blog.title}</span>
					<span className={".blog-author"}> {blog.author}</span>
				</div>
			</Link>
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
