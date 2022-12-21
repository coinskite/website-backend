const Blog = require('../models/blog')

async function getLatestBlog(req, res) {
  try {
    const blog = await Blog.findOne().sort({ createdAt: -1 }).lean()

    res.json({ blog, msg: "Successful" })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function getBlogs(req, res) {
  const { category } = req.params

  try {
    const filters = {}
    if (category !== "All") filters.category = category

    const blogs = await Blog.find(filters).sort({ createdAt: -1 }).lean()

    res.json({ blogs })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function postBlogs(req, res) {
  const { category, title, description, img } = req.body

  try {
    const blog = new Blog({ category, title, description, img })
    await blog.save()

    res.json({ blog })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function putBlogs(req, res) {
  const { _id, ...rest } = req.body

  try {
    await Blog.findByIdAndUpdate(_id, { ...rest })
    res.json({ msg: "Blog updated succuessfully" })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function deleteBlogs(req, res) {
  const { _id } = req.params

  try {
    await Blog.findByIdAndRemove(_id)
    res.json({ msg: "Blog deleted successfully" })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

module.exports = {
  getLatestBlog,
  getBlogs,
  postBlogs,
  putBlogs,
  deleteBlogs
}