const errorHandler = (error, req, res, next) => {
	console.log(error)
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

module.exports = errorHandler