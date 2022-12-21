const { Job, Category } = require('../models/job')

async function getCategorys(req, res) {
  try {
    const categories = await Category.find().lean()
    res.json({ categories })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function getJobs(req, res) {
  try {
    const jobs = await Job.find().select("-points -__v").lean()
    const filteredData = []

    jobs.forEach(job => {
      let index = filteredData.findIndex(data => data.title === job.category)
      if (index !== -1) {
        filteredData[index].roles.push({ ...job })
      } else {
        filteredData.push({
          title: job.category,
          roles: [{ ...job }]
        })
      }
    })

    res.json({ filteredData })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function getJobIds(req, res) {
  try {
    const ids = await Job.find().select("_id").lean()
    res.json({ ids })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function getJob(req, res) {
  const { _id } = req.params

  try {
    const job = await Job.findById(_id).lean()
    res.json({ job })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function createCategory(req, res) {
  const { name } = req.body

  try {
    const category = new Category({ name })
    await category.save()
    res.json({ category })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function postJobs(req, res) {
  try {
    const job = new Job({ ...req.body })
    await job.save()
    res.json({ job })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function putJobs(req, res) {
  try {
    res.json({})

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

async function deleteJobs(req, res) {
  const { _id } = req.params

  try {
    let dataa = await Job.findByIdAndRemove(_id)
    res.json({ dataa })

  } catch (error) {
    res.status(400).json({ error, msg: '' })
  }
}

module.exports = {
  getCategorys,
  getJobs,
  getJobIds,
  getJob,
  postJobs,
  putJobs,
  deleteJobs,
  createCategory,
}