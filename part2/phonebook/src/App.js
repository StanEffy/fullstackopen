import { useEffect, useRef, useState } from "react"
import Form from "./Components/Form/Form"

import { addNumber, deleteNumber, getNumbers, updateNumber } from "./api/api"
import Announcement from "./Components/Anouncement/Anouncement"
import Person from "./Components/Persons/Person"
import Filter from "./Components/Filter/Filter"

const App = () => {
	const [persons, setPersons] = useState([])
	const [notification, setNotification] = useState(null)

	const handleNotification = (type, text) => {
		setNotification({
			type,
			message: text,
		})
	}

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
		deleteNumber(id)
			.then((res) => {
				setPersons((prev) => [...prev.filter((p) => p.id !== id)])
				handleNotification("success", `User was succesfully deleted!`)
			})
			.catch((e) => {
				handleNotification("error", `${e.message}`)
				getNumbers().then((data) => {
					setPersons([...data])
				})
			})
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
					if (response.name === newPerson.name) {
						setPersons((prev) => [...prev, response])
						handleNotification(
							"success",
							`User ${response.name} was succesfully added!`
						)
					}
					alert("Something went wrong")
			  })
			: confirmNewNum(newPerson, persons)
	}

	useEffect(() => {
		if (notification) {
			const timeoutId = setTimeout(() => {
				setNotification(null)
			}, 4000)
			return () => {
				clearTimeout(timeoutId)
			}
		}
	}, [notification])

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} />
			{notification ? (
				<Announcement
					type={notification.type}
					message={notification.message}
				/>
			) : null}
			<Form name={name} number={number} handleSubmit={handleSubmit} />
			<h2>Numbers</h2>
			<ul>
				{persons.map((p) => (
					<Person key={p.name} p={p} handleDelete={handleDelete} />
				))}
			</ul>
		</div>
	)
}

export default App
