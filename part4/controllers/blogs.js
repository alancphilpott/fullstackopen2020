const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body

  if (!body.title && !body.url)
    return res.status(400).json({ error: 'Blog Must Contain a Title or URL' })

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes | 0
  })

  blog
    .save()
    .then((savedBlog) => res.status(201).json(savedBlog))
    .catch((err) => next(err))
})

blogsRouter.put('/:id', async (req, res) => {
  const likes = req.body.likes

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      likes
    },
    { new: true }
  )
  res.json(updatedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

module.exports = blogsRouter
