const dotenv = require("dotenv")

dotenv.config({path: "./config.env"})

const PORT = process.env.PORT
const MONGODB_URI = process.env.DATABASE

const DB = process.env.DATABASE.replace("password", process.env.PASSWORD)

module.exports = {
    MONGODB_URI,
    PORT,
    DB
}
