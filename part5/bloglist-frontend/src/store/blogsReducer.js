import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"
import { setNotify } from "./notificationReducer"

const initialState = []

const blogsSlice = createSlice({
	name: "blogs",
	initialState,
	reducers: {
		setAllBlogs(state, action) {
			return action.payload
		},
		addBlog(state, action) {
			return state.concat(action.payload)
		},
		voteForBlog(state, action) {
			return state.map((b) =>
				b.id == action.payload ? { ...b, likes: b.likes + 1 } : b
			)
		},
		addComment(state, action) {
			const newState = [...state]
			newState
				.find((b) => b.id === action.payload.id)
				.comments.push(action.payload.comment)
			return newState
		},
		deleteBlog(state, action) {
			return state.filter((b) => b.id != action.payload)
		},
	},
})

export const initializeBlogs = () => {
	return async (dispatch) => {
		try {
			const blogs = await blogsService.getAll()
			dispatch(setAllBlogs(blogs))
		} catch (e) {
			dispatch(
				setNotify({ message: e.response.data.error, type: "error" })
			)
		}
	}
}

export const voteBlog = (blog) => {
	return async (dispatch) => {
		try {
			await blogsService.updateBlogpost(blog.id, {
				...blog,
				likes: blog.likes + 1,
			})
			dispatch(addComment())
		} catch (e) {
			dispatch(
				setNotify({ message: e.response.data.error, type: "error" })
			)
		}
	}
}

export const addCommentToBlog = (id, comment) => {
	return async (dispatch) => {
		try {
			await blogsService.updateBlogpostComments(id, comment)
			dispatch(addComment({ id, comment }))
		} catch (e) {
			dispatch(
				setNotify({ message: e.response.data.error, type: "error" })
			)
		}
	}
}

export const addNew = (blog) => {
	return async (dispatch) => {
		const res = await blogsService.createNewBlogpost(blog)
		dispatch(addBlog(res))
	}
}

export const deletePost = (id) => {
	return async (dispatch) => {
		try {
			await blogsService.deletePost(id)
			dispatch(deleteBlog(id))
		} catch (e) {
			dispatch(
				setNotify({ message: e.response.data.error, type: "error" })
			)
		}
	}
}
export const { setAllBlogs, voteForBlog, deleteBlog, addBlog, addComment } =
	blogsSlice.actions

export default blogsSlice.reducer
