import React from "react"
import "./index.css"
const Anouncement = ({ type, message }) => {
	return (
		<div className={type === "error" ? "error" : "success"}>{message}</div>
	)
}

export default Anouncement
