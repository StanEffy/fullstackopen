const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Phone = require('./schema/phone')
const errorHandler = require('./error-handler')



app.use(cors())
app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))


app.get('/', (request, res) => {
  res.send('<h1>Hello World!</h1>')
})


app.get('/api/persons', (request, res) => {
	Phone.find({}).then(result => {
		res.json(result)
	})
})



app.get('/info', (request, res) => {
  res.send(`
	<div>
		<p>Phonebook has info for ${phonebook.length} people</p>
		<p>${new Date()}</p>
	</div>`)
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
	Phone.findById(id).then(phone => {
		phone ? res.json(phone) : res.status(404).end()
	}).catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res) => {
	const id = req.params.id

	Phone.findByIdAndRemove(id).then(phone => {
    res.status(204).end()
  }).catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
	const body = req.body
  console.log(body)
	Phone.findOne({name : body.name.trim()}).then(
		phone => {
			if(phone){
				return res.status(400).json({
			error: 'name should be unique'
		})
			} else if(!body.name || !body.number) {
				return res.status(400).json({ 
					error: 'number or name is missing' 
				})
			}
		
		const person = new Phone({
    name: body.name,
    number: body.number,

  })
		console.log(person)
	person.save().then(newPerson => {
    res.json(newPerson)
  })

  res.json(person)
		} 
		
		
		
	)
	

  
})
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const num = {
    name: body.name,
    number: body.number,
		id: body.id,
  }

  Phone.findByIdAndUpdate(req.params.id, num, { new: true })
    .then(updatedNumber => {
      res.json(updatedNumber)
    })
    .catch(error => next(error))
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app;
