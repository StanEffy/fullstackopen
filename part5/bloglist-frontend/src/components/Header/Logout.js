import React from "react"
import Button from "@mui/material/Button"
import PropTypes from "prop-types"
import LogoutIcon from "@mui/icons-material/Logout"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box"
const Logout = ({ username, logout }) => {
	return (
		<Box
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			sx={{ py: 0.5 }}
		>
			<Typography variant={"subtitle2"}>
				Well, <b>{username}</b> is logged in
			</Typography>
			<Button
				variant={"contained"}
				onClick={() => logout()}
				sx={{ borderRadius: 8 }}
			>
				<LogoutIcon />
			</Button>
		</Box>
	)
}
Logout.propTypes = {
	username: PropTypes.string,
	logout: PropTypes.func,
}
export default Logout
