const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../index")
const helper = require("./test_helper")

const Blog = require("../schema/blog")
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    let noteObject = new Blog(helper.initialBlogs[0])
    await noteObject.save()

    noteObject = new Blog(helper.initialBlogs[1])
    await noteObject.save()
})


test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
})

test("there are two blogs", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test("the first note is about HTTP methods", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].author).toBe("John Smith")
})

test("a valid blogpost can be added", async () => {
    const newNote = {
        title: "Title test add",
        author: "Sam",
        url: "google.com",
        likes: 7
    }

    await api
        .post("/api/blogs")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(
        "Title test add"
    )
})

test("an existant blog can be found by id and deteled", async () => {
    const {body} = await api.get("/api/blogs")

    const {_id} = body[body.length-1]

    await api
        .delete(`/api/blogs/${_id}`)
        .expect(204)


    expect(body).toHaveLength(helper.initialBlogs.length)
})

test("blogpost without content is not added", async () => {
    const newBlog= {
        title: "Just a title"
    }
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.disconnect()
})
