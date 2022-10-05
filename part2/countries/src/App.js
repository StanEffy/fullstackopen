import { useEffect, useRef, useState } from "react"
import Form from "./Components/Form/Form"

import { addNumber, deleteNumber, getNumbers, updateNumber } from "./api/api"

const App = () => {
	const [persons, setPersons] = useState([])
	useEffect(() => {
		getNumbers().then((data) => {
			setPersons([...data])
		})
	}, [])

	useEffect(() => {}, [persons])
	const filter = useRef()
	const name = useRef()
	const number = useRef()

	const handleDelete = (id) => {
		deleteNumber(id).then(() =>
			setPersons((prev) => [...prev.filter((p) => p.id !== id)])
		)
	}

	const confirmNewNum = (newPerson, persons) => {
		const { id } = persons.find((p) => p.name === newPerson.name)
		confirm(
			`${newPerson.name} is already added to phonebook, replace the old number`
		)
			? updateNumber(id, newPerson).then((res) =>
					setPersons((prev) => [
						...prev.filter((n) => n.id !== id),
						newPerson,
					])
			  )
			: null
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const newPerson = {
			name: name.current.value.trim(),
			number: number.current.value,
		}

		!persons.find((p) => p.name === newPerson.name)
			? addNumber(newPerson).then((response) => {
					response.status === 201
						? setPersons((prev) => [...prev, response.data])
						: alert("Something went wrong")
			  })
			: confirmNewNum(newPerson, persons)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				<span>Filter:</span>
				<input type="text" ref={filter} />
			</div>
			<Form name={name} number={number} handleSubmit={handleSubmit} />
			<h2>Numbers</h2>
			<ul>
				{persons.map((p) => (
					<li>
						<p key={p.name}>
							{p.name} {p.number}
						</p>
						<button onClick={() => handleDelete(p.id)}>
							delete
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
