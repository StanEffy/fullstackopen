const app = require("./index.js")
const http = require("http")
const config = require("./utils/config.js")

const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
