const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const {errorHandler, unknownEndpoint} = require("./utils/middleware")
const blogRouter = require("./controllers/blog")

app.use(cors())
app.use(express.json())

morgan.token("body", (req) => {
    return JSON.stringify(req.body)
})
app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :body")
)
app.use("/api/blogs", blogRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
