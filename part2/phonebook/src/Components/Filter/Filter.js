import React from "react"

const Filter = ({ filter }) => {
	return (
		<div>
			<span>Filter:</span>
			<input type="text" ref={filter} />
		</div>
	)
}

export default Filter
