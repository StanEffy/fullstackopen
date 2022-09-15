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

blogRouter.get("/:id", async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).end()
        }
    } catch(exception) {
        next(exception)
    }
})


blogRouter.delete("/:id", async (request, response, next) => {
    try {
        const id =  request.params.id
        const result = await Blog.findByIdAndDelete(id)
        response.status(204).json(result)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter
