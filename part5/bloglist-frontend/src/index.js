import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import blogsReducers from "./store/blogsReducer"
import notificationReducer from "./store/notificationReducer"

const store = configureStore({
	reducer: {
		blogs: blogsReducers,
		notification: notificationReducer,
	},
})

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<App />
	</Provider>
)
