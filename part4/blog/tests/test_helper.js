const Blog = require("../schema/blog")

const initialBlogs = [
    {
        "title": "Germ",
        "author": "Nick Vachovski",
        "url": "google.com",
        "likes": 32,
        "id": "63231b8586c0911fed5f05d9"
    },
    {
        "title": "Germ 2",
        "author": "Nick Vachovski",
        "url": "google.com",
        "likes": 32,
        "id": "63231b8586c0911fed5f05d9"
    }
]


const nonExistingId = async () => {
    const blog = new Blog({
        title: "willremovethissoon",
        author: "Stan",
        url: "google.com",
        likes: 0 }
    )
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs =  await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
