const mongoose = require("mongoose")

const phoneSchema = new mongoose.Schema({
	name: {type: String, unique: true, require: true, trim: true},
	number: {type: String, require: true},
	id: Number
})

const Phone = mongoose.model("Phone", phoneSchema, "phonebook")

module.exports = Phone