import React, { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { voteBlog, addCommentToBlog } from "../../store/blogsReducer"
import { setNotify } from "../../store/notificationReducer"
import Button from "@mui/material/Button"
import {
	Box,
	Card,
	CardContent,
	ListItem,
	TextField,
	Typography,
	List,
} from "@mui/material"
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
		<Card sx={{ maxWidth: "500px", m: "20px auto" }}>
			<CardContent>
				<Typography variant={"h5"}>Title: {blog.title}</Typography>
				<a href={blog.url}>Link to a blog</a>
				<Box>
					<Typography variant="body2">
						{blog.likes} liked it!
					</Typography>
					<Button
						variant="contained"
						onClick={() => handleLike(blog)}
					>
						Ay! Me gusto!
					</Button>
				</Box>
				<Typography variant={"h6"}>Author: {blog.author}</Typography>
				<Box display={"flex"} flexDirection={"column"}>
					<TextField
						type={"text"}
						name={"comment"}
						ref={comment}
						label={"Your comment"}
					/>
					<Button
						variant="contained"
						sx={{ my: 1 }}
						onClick={() => handleAddComment()}
					>
						add comment
					</Button>
				</Box>

				{blog.comments ? (
					<List>
						{blog.comments.map((c, i) => (
							<ListItem key={id + "-comments-" + i}>{c}</ListItem>
						))}
					</List>
				) : null}
			</CardContent>
		</Card>
	)
}

export default SingleBlogPost
