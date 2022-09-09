import React from "react"

const Person = ({ p, handleDelete }) => {
	return (
		<li>
			<p>
				{p.name} {p.number}
			</p>
			<button onClick={() => handleDelete(p.id)}>delete</button>
		</li>
	)
}

export default Person
