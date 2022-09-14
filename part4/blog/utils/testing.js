const favoriteBlog = (blogs) => {
    return blogs.length > 0 ? Math.max.apply(null, blogs.map(b => b.likes)) : 0
}

const totalLikes = (blogs) => {
    return blogs.length > 0 ? blogs.reduce((acc, next) => acc + next.likes, 0) : 0
}
const mostPopular = (blogs) => {
    if(blogs.length === 0) return "There are no blogs"

    const firstPost = blogs.find(b => b.likes === Math.max.apply(null, blogs.map(b => b.likes)))
    const {title, author, likes} = firstPost
    return {title, author,likes }
}
const mostBlogs = (blogsarr) => {
    if(blogsarr.length === 0) return "There are no blogs"

    const blog = blogsarr.find(b => b.blogs === Math.max.apply(null, blogsarr.map(b => b.blogs)))
    const {author, blogs} = blog
    return {author, blogs}
}
module.exports = {
    favoriteBlog, totalLikes, mostPopular, mostBlogs
}
