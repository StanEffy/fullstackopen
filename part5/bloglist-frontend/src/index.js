import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import blogsReducers from "./store/blogsReducer"
import notificationReducer from "./store/notificationReducer"
import usersReducer from "./store/usersReducer"
import { BrowserRouter } from "react-router-dom"

const store = configureStore({
	reducer: {
		blogs: blogsReducers,
		notification: notificationReducer,
		user: usersReducer,
	},
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)
