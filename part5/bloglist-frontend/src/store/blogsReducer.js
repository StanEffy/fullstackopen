import { createSlice } from "@reduxjs/toolkit"
import blogsService from "../services/blogs"

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
		deleteBlog(state, action) {
			return state.filter((b) => b.id != action.payload)
		},
	},
})

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogsService.getAll()
		dispatch(setAllBlogs(blogs))
	}
}

export const voteBlog = (blog) => {
	return async (dispatch) => {
		const res = await blogsService.updateBlogpost(blog.id, {
			...blog,
			likes: blog.likes + 1,
		})
		console.log(res)
		dispatch(voteForBlog(blog.id))
	}
}

export const addNew = (blog) => {
	return async (dispatch) => {
		const res = await blogsService.createNewBlogpost(blog)
		console.log(res)
		dispatch(addBlog(blog))
	}
}

export const deletePost = (id) => {
	return async (dispatch) => {
		const res = await blogsService.deletePost(id)
		console.log(res)
		dispatch(deleteBlog(id))
	}
}
export const { setAllBlogs, voteForBlog, deleteBlog, addBlog } =
	blogsSlice.actions

export default blogsSlice.reducer
