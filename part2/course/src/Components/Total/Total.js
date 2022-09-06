import React from "react"

const Total = ({ parts }) => {

	return (
		<p>
			Number of exercises {parts.reduce((prev, cur) => prev + cur.exercises, 0 )}
		</p>
	)
}

export default Total
