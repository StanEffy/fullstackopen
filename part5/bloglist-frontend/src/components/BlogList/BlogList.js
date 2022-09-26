import React, { useEffect } from "react"
import Blog from "../Blog"
import PropTypes from "prop-types"
import BlogForm from "../BlogForm/BlogForm"

const BlogList = ({ blogs = [] }) => {
	useEffect(() => {}, [blogs])
	return (
		<div>
			<BlogForm />
			<h2>blogs</h2>
			<ul className={"blog-list"}>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</ul>
		</div>
	)
}
BlogList.propTypes = {
	blogs: PropTypes.array,
}
export default BlogList
