const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
require('dotenv').config()

const app = express()

connectDB()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const applicationRoutes = require('./routes/application')
const blogRoutes = require('./routes/blog')
const imgRoutes = require('./routes/img')
const jobRoutes = require('./routes/job')

app.use('/job', jobRoutes)
app.use('/blog', blogRoutes)
app.use('/upload', imgRoutes)
app.use("/application", applicationRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message || "Internal Server Error"
    }
  })
})

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`App is running on ${port}`))