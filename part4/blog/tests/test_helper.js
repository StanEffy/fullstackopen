const Blog = require("../schema/blog")

const initialBlogs = [
    {
        title: "Title",
        author: "John Smith",
        url: "google.com",
        likes:7
    },
    {
        title: "Title2",
        author: "John Doe",
        url: "google.com",
        likes: 17
    }
]


const nonExistingId = async () => {
    const blog = new Blog({ title: "willremovethissoon", author: "Stan" })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    return await Blog.find({})

}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}
