const blogRouter = require("express").Router()
const Blog = require("../schema/blog")

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post("/", async (request, response, next) => {
    const body = await request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch(exception) {
        next(exception)
    }

})
blogRouter.delete("/:id", async (request, response) => {
    const id =  request.params.id

    const result = await Blog.findByIdAndDelete(id)

    response.status(204).json(result)

})

module.exports = blogRouter
