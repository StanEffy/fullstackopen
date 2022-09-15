const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title: {type: String, required: true, minLength: 4, unique: true},
    author: {type: String, required: true},
    url: {type: String, required: true},
    likes: {type: Number, required: true}
})

blogSchema.set("toJSON", {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Blog = mongoose.model("Blog", blogSchema, "blogs")

module.exports = Blog
