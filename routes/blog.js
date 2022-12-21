const express = require('express')
const { getBlogs, postBlogs, putBlogs, deleteBlogs, getLatestBlog } = require('../controllers/blog')
const router = express.Router()

router.get('/getLatest', getLatestBlog)
router.get('/:category', getBlogs)
router.post('/', postBlogs)
router.put('/', putBlogs)
router.delete('/:_id', deleteBlogs)

module.exports = router