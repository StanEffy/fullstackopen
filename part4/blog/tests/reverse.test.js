const totalLikes = require("../utils/testing").totalLikes
const favouriteBlog = require("../utils/testing").favoriteBlog
const mostPopular = require("../utils/testing").mostPopular
const mostBlogs = require("../utils/testing").mostBlogs

describe("count total likes", () => {
    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        }
    ]
    const emptyBlog = []
    const multiBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 6,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 7,
            __v: 0
        }
    ]

    test("when list has only one blog, equals the likes of that", () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
    test("when list is empty return 0", () => {
        const result = totalLikes(emptyBlog)
        expect(result).toBe(0)
    })
    test("when list has only many blogs, counts correctly", () => {
        const result = totalLikes(multiBlog)
        expect(result).toBe(18)
    })
})

describe("return the most popular blog post", () => {const emptyBlog = []
    const multiBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 6,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 7,
            __v: 0
        }
    ]
    test("to be 0 on empty list", () => {
        const result = favouriteBlog(emptyBlog)
        expect(result).toBe(0)
    })
    test("to be 7 on empty list", () => {
        const result = favouriteBlog(multiBlog)
        expect(result).toBe(7)
    })

})
describe("return correct values of the most popular blog", () => {
    const multiBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful222",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 16,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful3",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 70,
            __v: 0
        }
    ]

    test("when list has only many blogs, counts correctly", () => {
        const result = mostPopular(multiBlog)
        console.log(result)
        expect(result).toEqual({
            title: "Go To Statement Considered Harmful3",
            author: "Edsger W. Dijkstra",
            likes: 70}
        )
    })
})


describe("return the correct name of the most productive author", () => {
    const empty = []
    const multi = [
        {author: "Thomas Mann", blogs: 56},
        {author: "Remarque", blogs: 4},
        {author: "Tacitus", blogs: 5}
    ]

    test("should return string 'There are no blogs' for an empty array", () => {

        const result = mostBlogs(empty)
        expect(result).toBe("There are no blogs")
    })
    test("should return Thomas Mann", () => {
        const result = mostBlogs(multi)
        expect(result).toEqual({author: "Thomas Mann", blogs: 56})
    })
})
