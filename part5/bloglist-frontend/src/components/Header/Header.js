import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<nav>
			<Link to={"/blogs"} style={{ padding: "5px" }}>
				blogs
			</Link>
			<Link to={"/users"} style={{ padding: "5px" }}>
				users
			</Link>
		</nav>
	)
}

export default Header
