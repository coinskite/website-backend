let mongoose = require('mongoose')

let Blog = mongoose.model('Blog', {
  category: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  img: {
    fileType: {
      type: String,
      // required: true
    },
    fileName: {
      type: String,
      // required: true
    }
  }
})

module.exports = Blog