import React, { useState } from "react"
import blogService from "../../services/blogs"
import { useDispatch, useSelector } from "react-redux"
import { setNotify } from "../../store/notificationReducer"
import { Box, Button, FormControl, TextField, Typography } from "@mui/material"

const BlogForm = () => {
	const [visible, setVisibility] = useState(false)
	const [blogpost, setBlogpost] = useState({
		title: "",
		url: "",
	})
	const { username } = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const setNotification = (notification) => dispatch(setNotify(notification))

	const hideForm = () => {
		setVisibility(false)
		setBlogpost((prev) => ({ ...prev, title: "", author: "", url: "" }))
	}
	const showForm = () => {
		setVisibility(true)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const res = await blogService.createNewBlogpost({
				...blogpost,
				author: username,
			})

			setNotification({
				type: "success",
				message: `Yaaay! New blogpost ${res.title} was created by ${res.author}`,
			})
			setBlogpost((prev) => ({ ...prev, title: "", author: "", url: "" }))
		} catch (e) {
			console.log(e)
			setNotification({
				type: "error",
				message: e?.response?.data?.error
					? e.response.data.error
					: e.message,
			})
		}
	}
	return (
		<>
			{visible ? (
				<>
					<Box
						component={"form"}
						display={"flex"}
						flexDirection={"column"}
						sx={{ maxWidth: "500px" }}
						onSubmit={handleSubmit}
					>
						<Typography variant={"h5"} textAlign={"center"}>
							Creating new blogpost
						</Typography>
						<FormControl>
							<TextField
								type="text"
								variant="filled"
								label={"Blog title"}
								value={blogpost.title}
								name="title"
								id={"form-title"}
								onChange={({ target }) =>
									setBlogpost((prev) => ({
										...prev,
										title: target.value,
									}))
								}
							/>
						</FormControl>
						<FormControl>
							<TextField
								type="text"
								value={blogpost.url}
								variant="filled"
								name="url"
								label={"Blog url"}
								id={"form-url"}
								onChange={({ target }) =>
									setBlogpost((prev) => ({
										...prev,
										url: target.value,
									}))
								}
							/>
						</FormControl>
						<Button
							id={"form-button-submit"}
							variant={"contained"}
							onClick={(e) => handleSubmit(e)}
							sx={{ my: 1 }}
						>
							SEND NEW BLOGPOST
						</Button>
						<Button onClick={() => hideForm()}>
							cancel all this
						</Button>
					</Box>
				</>
			) : (
				<Button onClick={() => showForm()}>add new blogpost</Button>
			)}
		</>
	)
}

export default BlogForm
