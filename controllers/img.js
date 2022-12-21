const mongoose = require('mongoose')

const options = {
  bucketName: 'uploads'
}

async function getFiles(req, res) {
  const gfB = new mongoose.mongo.GridFSBucket(mongoose.connection.db, options)

  const d = gfB.openDownloadStreamByName(req.params.filename)

  d.on("data", (chunk) => { res.write(chunk) })

  d.on("error", (err) => { res.json({ err }) })

  d.on("end", () => { res.end() })
}

async function postFiles(req, res) {
  try {
    const names = req.files.map(file => {
      return {
        fileName: file.filename,
        fileType: file.mimetype,
      }
    })

    res.json({ names })

  } catch (error) {
    res.status(400).json({ error, msg: 'files upload failed' })
  }
}

module.exports = {
  getFiles,
  postFiles
}