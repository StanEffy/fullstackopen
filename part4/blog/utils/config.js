const dotenv = require("dotenv")

dotenv.config({path: "./config.env"})

const PORT = process.env.PORT

const DB = process.env.DATABASE.replace("password", process.env.PASSWORD)

module.exports = {
    PORT,
    DB
}
