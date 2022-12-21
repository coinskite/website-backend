const express = require('express')
const { getFiles, postFiles } = require('../controllers/img')
const upload = require('../middlewares/GFupload')

const router = express.Router()

router.get('/:filename', getFiles)
router.post('/', upload.array('files', 10), postFiles)

module.exports = router