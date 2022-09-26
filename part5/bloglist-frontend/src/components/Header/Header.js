import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<nav>
			<Link to={"/"} style={{ padding: "5px" }}>
				home
			</Link>
			<Link to={"/users"} style={{ padding: "5px" }}>
				users
			</Link>
			<Link to={"/blogs"} style={{ padding: "5px" }}>
				blogs
			</Link>
		</nav>
	)
}

export default Header
