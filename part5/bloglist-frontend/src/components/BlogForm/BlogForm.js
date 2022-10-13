import React, { useState } from "react"
import blogService from "../../services/blogs"
import { useDispatch, useSelector } from "react-redux"
import { setNotify } from "../../store/notificationReducer"

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
					<form onSubmit={handleSubmit}>
						<div>
							<label>
								title
								<input
									type="text"
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
							</label>
						</div>
						<div>
							<label>
								url
								<input
									type="text"
									value={blogpost.url}
									name="url"
									id={"form-url"}
									onChange={({ target }) =>
										setBlogpost((prev) => ({
											...prev,
											url: target.value,
										}))
									}
								/>
							</label>
						</div>
						<button
							id={"form-button-submit"}
							onClick={(e) => handleSubmit(e)}
						>
							SEND NEW BLOGPOST
						</button>
					</form>
					<button onClick={() => hideForm()}>cancel all this</button>
				</>
			) : (
				<button onClick={() => showForm()}>add new blogpost</button>
			)}
		</>
	)
}

export default BlogForm
