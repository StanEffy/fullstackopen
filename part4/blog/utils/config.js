const dotenv = require("dotenv")

dotenv.config({path: "./config.env"})

const PORT = process.env.PORT

const DB = process.env.NODE_ENV === "test" ? process.env.DATABASE_LOCAL : process.env.DATABASE

module.exports = {
    PORT,
    DB
}
