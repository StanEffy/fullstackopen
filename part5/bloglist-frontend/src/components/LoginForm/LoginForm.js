import React from "react"
import PropTypes from "prop-types"
import { Button, FormControl, Input, InputLabel } from "@mui/material"
import Box from "@mui/material/Box"

// eslint-disable-next-line react/prop-types
const LoginForm = ({
	handleLogin,
	username,
	password,
	setPassword,
	setUsername,
}) => {
	return (
		<Box
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			flexDirection={"column"}
			component={"form"}
			sx={{ pt: 5 }}
			onSubmit={handleLogin}
		>
			<FormControl sx={{ py: 1 }}>
				<InputLabel htmlFor={"username"}>Username</InputLabel>
				<Input
					type="text"
					value={username}
					name="Username"
					id={"username"}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</FormControl>
			<FormControl sx={{ py: 1 }}>
				<InputLabel htmlFor={"password"}>Password</InputLabel>
				<Input
					type="password"
					value={password}
					name="password"
					id={"password"}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</FormControl>
			<Button id={"login-button"} type="submit">
				login
			</Button>
		</Box>
	)
}
LoginForm.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
	handleLogin: PropTypes.func,
	setPassword: PropTypes.func,
	setUsername: PropTypes.func,
}
export default LoginForm
