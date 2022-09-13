const mongoose = require("mongoose")

const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "User name is required"],
        trim: true,
        minLength: [3, "Minimum length of the name is three letters"],
    },
    number: {
        type: String,
        required: [true, "User phone number required"],
        validate: {
            validator: (v) => {
                return /\d{2,3}-\d{6,}/.test(v)
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
})

const Phone = mongoose.model("Phone", phoneSchema, "phonebook")

module.exports = Phone
