const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((b) => new Blog(b))

  const promiseArray = blogObjects.map((b) => b.save())
  await Promise.all(promiseArray)
})

describe('HTTP GET', () => {
  test('there are two blogs', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blog posts unique field is named id', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogs = res.body

    expect(blogs[0].id).toBeDefined()
  })
})

describe('HTTP POST', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Blog From Test',
      author: 'Aldo McBean',
      url: 'http://example.com',
      likes: 400
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const blogTitles = blogsAtEnd.map((b) => b.title)
    expect(blogTitles).toContain('Blog From Test')
  })

  test('providing no likes property defaults the value to 0', async () => {
    const newBlog = {
      title: 'Blog From Test',
      author: 'Aldo McBean',
      url: 'http://example.com'
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toEqual(0)
  })

  test('a blog without a title and url prop is not added', async () => {
    const newBlog = {
      author: 'Aldo McBean',
      likes: 1
    }

    await api.post('/api/blogs').send(newBlog).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('HTTP DELETE', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToView.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  })
})

afterAll(() => mongoose.connection.close())
