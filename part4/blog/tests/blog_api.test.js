const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../index")
const helper = require("./test_helper")

const Blog = require("../schema/blog")
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})


describe("when there is initially soma blogs saved", () => {
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
        expect(response.body[0].author).toBe("Nick Vachovski")
    })
})

describe("viewing a specific blogpost", () => {

    test("fails with statuscode 404 if blogpost does not exist", async () => {
        const validNonExistingId = await helper.nonExistingId()

        await api
            .get(`/api/blogs/${validNonExistingId}`)
            .expect(404)
    })

    test("fails with statuscode 400 id is invalid", async () => {
        const invalidId = "554"

        await api
            .get(`/api/blogs/${invalidId}`)
            .expect(400)
    })
    test("specific blogpost can be viewed", async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

        expect(resultBlog.body).toEqual(processedBlogToView)
    })
})
describe("addition a new blogpost", () => {
    let headers

    beforeEach(async() => {
        const newUser = {
            username: "user",
            name: "user",
            password: "password",
        }

        await api
            .post("/api/users")
            .send(newUser)

        const result = await api
            .post("/api/login")
            .send(newUser)

        headers = {
            "Authorization": `bearer ${result.body.token}`
        }
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
            .set(headers)
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

    test("if blogpost has no likes field, than field is created with 0 value", async () => {
        const newNote = {
            title: "Title test add 2",
            author: "Sam",
            url: "google.com",
        }

        const savedNote = await api
            .post("/api/blogs")
            .send(newNote)
            .set(headers)

        expect(savedNote._body.likes).toEqual(0)
    })

    test("blogpost without content is not added", async () => {
        const newBlog= {
            title: "Just a title"
        }
        await api
            .post("/api/blogs")
            .send(newBlog)
            .set(headers)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})
// describe("deletion of a blogpost", () => {
//     let headers
//
//     beforeEach(async() => {
//         const newUser = {
//             username: "user",
//             name: "user",
//             password: "password",
//         }
//
//         await api
//             .post("/api/users")
//             .send(newUser)
//
//         const result = await api
//             .post("/api/login")
//             .send(newUser)
//
//         headers = {
//             "Authorization": `bearer ${result.body.token}`
//         }
//     })
//     test("an existant blog can be found by id and deteled", async () => {
//         const blogs = await helper.blogsInDb()
//         const blogToDelete  = blogs[blogs.length-1]
//
//         await api
//             .delete(`/api/blogs/${blogToDelete.id}`)
//             .expect(204)
//             .set(headers)
//         const blogsAtEnd = await helper.blogsInDb()
//
//         expect(blogsAtEnd).toHaveLength(
//             helper.initialBlogs.length - 1
//         )
//
//         const contents = blogsAtEnd.map(r => r.title)
//
//         expect(contents).not.toContain(blogToDelete.title)
//     })
// })
//
// describe("check format of a created blogposts", () => {
//     test("expect id field to be defined and _id to be undefined", async () => {
//         const blogsAtStart = await helper.blogsInDb()
//
//         expect(blogsAtStart[0].id).toBeDefined()
//         expect(blogsAtStart[0]._id).toBe(undefined)
//
//     })
// })
// describe("update a blogpost", () => {
//     let headers
//
//     beforeEach(async() => {
//         const newUser = {
//             username: "user",
//             name: "user",
//             password: "password",
//         }
//
//         await api
//             .post("/api/users")
//             .send(newUser)
//
//         const result = await api
//             .post("/api/login")
//             .send(newUser)
//
//         headers = {
//             "Authorization": `bearer ${result.body.token}`
//         }
//     })
//     test("blogpost updated if reached by id", async () => {
//         const blogs = await helper.blogsInDb()
//
//         const blogToUpdate  = blogs[blogs.length-1]
//         const updatedBlog = {...blogToUpdate, title: "Completely new title"}
//         await api
//             .put(`/api/blogs/${blogToUpdate.id}`)
//             .send(updatedBlog)
//             .expect(204)
//             .set(headers)
//
//         const blogsUpdated = await helper.blogsInDb()
//
//         const newPost = blogsUpdated.find(b => b.id === blogToUpdate.id)
//
//         expect(newPost.title).toEqual("Completely new title")
//         expect(blogsUpdated).toHaveLength(helper.initialBlogs.length)
//     })
//
//     test("if blogpost's id doesn't exist you get 404", async () => {
//         const validNonexistingId = await helper.nonExistingId()
//         const updatedBlog = {}
//         await api
//             .put(`/api/blogs/${validNonexistingId}`)
//             .send(updatedBlog)
//             .expect(404)
//             .set(headers)
//     })
// })
afterAll(() => {
    mongoose.disconnect()
})
