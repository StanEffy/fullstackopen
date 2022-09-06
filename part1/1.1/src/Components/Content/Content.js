import React from "react"
import Part from "../Part/Part"

const Content = ({ part1, exc1, part2, exc2, part3, exc3 }) => {
	return (
		<>
			<Part part={part1} exc={exc1} />
			<Part part={part2} exc={exc2} />
			<Part part={part3} exc={exc3} />
		</>
	)
}

export default Content
