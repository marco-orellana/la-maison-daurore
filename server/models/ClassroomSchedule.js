const mongoose = require('mongoose')

const ClassroomScheduleSchema = new mongoose.Schema({
  id_day: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Day'
    }
  ],
  id_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    require: true
  }
})

module.exports = mongoose.model('ClassroomSchedule', ClassroomScheduleSchema)
