import React from "react"
import Button from "@mui/material/Button"
import PropTypes from "prop-types"

const Logout = ({ username, logout }) => {
	return (
		<div>
			<span>
				Well, <b>{username}</b> is definitely logged in
			</span>
			<Button variant={"contained"} onClick={() => logout()}>
				logout
			</Button>
		</div>
	)
}
Logout.propTypes = {
	username: PropTypes.string,
	logout: PropTypes.func,
}
export default Logout
