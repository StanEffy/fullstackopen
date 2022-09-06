import React from "react"
import Part from "../Part/Part"

const Content = ({ parts }) => {
	return (
		<>
			{parts.map((el, i) => 	<Part key={el.id} part={el.name} exc={el.exercises} />
			)}

		</>
	)
}

export default Content
