const blogRouter = require("express").Router()
const Blog = require("../schema/blog")
const middleware = require("../utils/middleware")


blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user")
    response.json(blogs.map(blog => blog.toJSON()))
})

blogRouter.post("/", middleware.userExtractor, async (request, response, next) => {
    const body = await request.body

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })

    try {
        const saved = await blog.save()
        user.blogs = user.blogs.concat(saved._id)
        await user.save()

        response.status(201).json(saved.toJSON())
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
blogRouter.put("/:id", middleware.userExtractor, async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        const body = request.body

        const user = request.user

        const updated = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        }

        if (blog) {
            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updated, { new: true })
            user.blogs = user.blogs.concat(updatedBlog._id)
            await user.save()
            response.status(204).json(updatedBlog.toJSON())
        } else {
            response.status(404).end()
        }
    } catch(exception) {
        next(exception)
    }
})

blogRouter.delete("/:id", middleware.userExtractor, async (request, response, next) => {
    try {
        const id =  request.params.id

        const result = await Blog.findByIdAndDelete(id)
        const user = request.user
        user.blogs = user.blogs.filter(b => b.id !== id )
        await user.save()

        response.status(204).json(result)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter
