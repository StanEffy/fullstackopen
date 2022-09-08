import {useRef, useState} from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('')
	const ref = useRef()
	const handleSubmit = (e) => {
		e.preventDefault()
		!persons.find(p => p.name === ref.current.value.trim()) ? setPersons((prev) => ([...prev, {name: ref.current.value}])) : alert(`${ref.current.value} is already added to phonebook`)
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input ref={ref}/>
				</div>
				<div>
					<button type="submit" onClick={(e) => handleSubmit(e)}>add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map(p => <p key={p.name}>{p.name}</p>)}
		</div>
	)
}

export default App
