const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const {errorHandler, unknownEndpoint} = require("./utils/middleware")
const blogRouter = require("./controllers/blog")
const mongoose = require("mongoose")
const logger = require("./utils/logger")
const config = require("./utils/config")

mongoose.connect(config.DB)
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message)
    })

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
