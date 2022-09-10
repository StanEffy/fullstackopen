const express = require('express')
const app = express()

let phonebook = [
	{ 
		"id": 1,
		"name": "Arto Hellas", 
		"number": "040-123456"
	},
	{ 
		"id": 2,
		"name": "Ada Lovelace", 
		"number": "39-44-5323523"
	},
	{ 
		"id": 3,
		"name": "Dan Abramov", 
		"number": "12-43-234345"
	},
	{ 
		"id": 4,
		"name": "Mary Poppendieck", 
		"number": "39-23-6423122"
	}
]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})



app.get('/api/persons', (request, response) => {
  response.json(phonebook)
})

app.get('/info', (request, response) => {
  response.send(`
	<div>
		<p>Phonebook has info for ${phonebook.length} people</p>
		<p>${new Date()}</p>
	</div>`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = phonebook.find(p => p.id == id)
  if (note) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id
	phonebook = phonebook.filter(p => p.id != id)

  response.status(204).end()
})

app.post('/api/persons', (req, res) => {
	const body = req.body

	console.log(req)
	if(phonebook.find(p => p.name === body.name.trim())){
		res.status(400).json({
			error: 'name should be unique'
		})
	}

	if (!body.name || !body.number) {
    return res.status(400).json({ 
      error: 'number or name is missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,

    id: Math.floor(Math.random() * 5959),
  }

  phonebook = phonebook.concat(person)

  res.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})