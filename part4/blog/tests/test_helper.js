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
    const blog = new Blog({ title: "willremovethissoon", author: "Stan" })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const res =  await Blog.find({})
    return res

}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
