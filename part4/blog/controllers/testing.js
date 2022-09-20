const testingRouter = require("express").Router()
const Note = require("../schema/blog")
const User = require("../schema/user")

testingRouter.post("/reset", async (request, response) => {
    await Note.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter
