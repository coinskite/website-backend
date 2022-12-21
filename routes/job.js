const express = require('express')
const {
  getCategorys, getJobs, getJob, getJobIds,
  createCategory, postJobs,
  putJobs, deleteJobs
} = require('../controllers/job')

const router = express.Router()

router.get('/category', getCategorys)
router.get('/', getJobs)
router.get('/ids', getJobIds)
router.get('/:_id', getJob)
router.post('/category', createCategory)
router.post('/', postJobs)
router.put('/', putJobs)
router.delete('/:_id', deleteJobs)

module.exports = router