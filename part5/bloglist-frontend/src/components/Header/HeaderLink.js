import React from "react"
import { Link as RouterLink } from "react-router-dom"

// eslint-disable-next-line react/display-name
const LinkBehavior = React.forwardRef((props, ref) => {
	const { href, ...other } = props

	return <RouterLink ref={ref} to={href} {...other} />
})
