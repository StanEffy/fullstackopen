import React, { useEffect } from "react"
import Blog from "../Blog"
import PropTypes from "prop-types"

const BlogList = ({ blogs = [], setNotification }) => {
	useEffect(() => {}, [blogs])
	return (
		<div>
			<h2>blogs</h2>
			<ul className={"blog-list"}>
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						blog={blog}
						setNotification={setNotification}
					/>
				))}
			</ul>
		</div>
	)
}
BlogList.propTypes = {
	blogs: PropTypes.array,
	setNotification: PropTypes.func,
}
export default BlogList
