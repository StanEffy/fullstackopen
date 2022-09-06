import React from "react"
import Part from "../Part/Part"

const Content = ({ parts }) => {
	return (
		<>
			<Part part={parts[0].name} exc={parts[0].exercises} />
			<Part part={parts[1].name} exc={parts[1].exercises} />
			<Part part={parts[2].name} exc={parts[2].exercises} />
		</>
	)
}

export default Content
