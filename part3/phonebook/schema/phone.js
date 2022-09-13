const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    minLength: [3, "Minimum length is three letters"],
  },
  number: { type: String, require: true },
});

const Phone = mongoose.model("Phone", phoneSchema, "phonebook");

module.exports = Phone;
