const mongoose = require('mongoose')

const DaySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: Number,
    require: true,
    unique: true
  }
})

module.exports = mongoose.model('Day', DaySchema)
