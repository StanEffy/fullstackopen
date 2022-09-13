const mongoose = require("mongoose")
const app = require("./index.js")
const config = require("./utils/config.js")

mongoose.connect(config.DB).then(() => console.log("DB connection successful!"))

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
