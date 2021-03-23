const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return (sum += blog.likes)
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  let favBlog = { likes: 0 }

  blogs.forEach((b) => {
    if (b.likes > favBlog.likes) favBlog = b
  })

  return {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
