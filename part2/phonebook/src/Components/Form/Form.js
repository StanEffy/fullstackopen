import React, { useRef } from "react"

const Form = ({ name, number, handleSubmit }) => {
	return (
		<form>
			<div>
				name: <input ref={name} />
			</div>
			<div>
				number:{" "}
				<input
					pattern={["d{2,3}-d{6,}"]}
					placeholder={"12(123)-456789+"}
					type={"tel"}
					ref={number}
					required={true}
				/>
			</div>
			<div>
				<button type="submit" onClick={(e) => handleSubmit(e)}>
					add
				</button>
			</div>
		</form>
	)
}

export default Form
