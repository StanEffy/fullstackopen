const dotenv = require("dotenv")

dotenv.config({path: "./config.env"})

const PORT = process.env.PORT

const DB = process.env.DATABASE

module.exports = {
    PORT,
    DB
}
