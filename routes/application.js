const express = require('express')
const { uploadResume, sendMail } = require('../controllers/application')
const upload = require('../middlewares/upload')

const router = express.Router()

router.post('/resume', upload.single("resume"), uploadResume)
router.post('/send', sendMail)

module.exports = router