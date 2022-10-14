import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

const Blog = ({ blog }) => {
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
