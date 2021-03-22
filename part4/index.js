require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (_, returnedBlog) => {
    returnedBlog.id = returnedBlog._id.toString()
    delete returnedBlog._id
    delete returnedBlog.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

const URL = process.env.MONGODB_URI

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => 'Successfully Connected to MongoDB')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs))
})

app.post('/api/blogs', (req, res) => {
  const blog = new Blog(req.body)

  blog.save().then((savedBlog) => res.status(201).json(savedBlog))
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server Running On Port ${PORT}`))
