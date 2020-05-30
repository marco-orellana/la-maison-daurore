const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  id_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  is_absent: Boolean,
  comment: String
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
