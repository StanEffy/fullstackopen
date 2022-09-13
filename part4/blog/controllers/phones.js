const phonesRouter = require("express").Router()
const Phone = require("../schema/phone")

phonesRouter.get("/", (request, res) => {
    Phone.find({}).then((result) => {
        res.json(result)
    })
})

phonesRouter.get("/info", (request, res) => {
    res.send(`
	<div>
		<p>Phonebook has info for many people</p>
		<p>${new Date()}</p>
	</div>`)
})

phonesRouter.get("/:id", (req, res, next) => {
    const id = req.params.id
    Phone.findById(id)
        .then((phone) => {
            phone ? res.json(phone) : res.status(404).end()
        })
        .catch((e) => next(e))
})

phonesRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id

    Phone.findByIdAndRemove(id)
        .then(() => {
            res.status(204).end()
        })
        .catch((error) => next(error))
})

phonesRouter.post("", (req, res, next) => {
    const body = req.body

    const { name, number } = body

    Phone.findOne({ name: name.trim() }).then((phone) => {
        if (phone) {
            return res.status(400).json({
                error: "name should be unique",
            })
        } else if (!body.name || !body.number) {
            return res.status(400).json({
                error: "number or name is missing",
            })
        }

        const person = new Phone({
            name: name,
            number: number,
        })
        person
            .save()
            .then((newPerson) => {
                res.json(newPerson)
            })
            .catch((e) => next(e))
    })
})
phonesRouter.put("/:id", (req, res, next) => {
    const body = req.body

    const num = {
        name: body.name,
        number: body.number,
        id: body.id,
    }

    Phone.findByIdAndUpdate(req.params.id, num, { new: true })
        .then((updatedNumber) => {
            res.json(updatedNumber)
        })
        .catch((error) => next(error))
})


module.exports = phonesRouter
