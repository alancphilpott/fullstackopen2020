const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Best Blog Title',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 0
  },
  {
    title: 'Learning Backend',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 20
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((b) => b.toJSON())
}

module.exports = { initialBlogs, blogsInDb }
