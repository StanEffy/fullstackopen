import React, { useEffect } from "react"
import Blog from "../Blog"
import PropTypes from "prop-types"
import BlogForm from "../BlogForm/BlogForm"
import { List, Typography } from "@mui/material"

const BlogList = ({ blogs = [] }) => {
	useEffect(() => {}, [blogs])
	return (
		<div>
			<Typography variant={"h3"} textAlign={"center"}>
				BLOGS
			</Typography>
			<BlogForm />
			<List className={"blog-list"}>
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</List>
		</div>
	)
}
BlogList.propTypes = {
	blogs: PropTypes.array,
}
export default BlogList
