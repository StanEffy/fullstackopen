import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { ListItem } from "@mui/material"
import Box from "@mui/material/Box"
import styled from "@emotion/styled"

const CustomLink = styled(Link)(() => ({
	color: "blue",
	textDecoration: "none",
	"&:hover": {
		color: "red",
	},
}))

const Blog = ({ blog }) => {
	return (
		<ListItem className={"blog-unit"}>
			<CustomLink to={`/blogs/${blog.id}`}>
				<Box>
					<span>{blog.title}</span>
					<span className={".blog-author"}> {blog.author}</span>
				</Box>
			</CustomLink>
		</ListItem>
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
