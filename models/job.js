let mongoose = require('mongoose')

let Category = mongoose.model('Category', {
  name: {
    type: String,
    required: true
  }
})

let Job = mongoose.model('Job', {
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

  location: {
    type: String,
    required: true
  },

  workType: {
    type: String,
    required: true
  },

  points: [{
    heading: {
      type: String,
      required: true
    },
    list: [{ type: String }]
  }]
})

module.exports = {
  Category,
  Job
}