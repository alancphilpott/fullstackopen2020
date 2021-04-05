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

test('there are two blogs', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => mongoose.connection.close())
