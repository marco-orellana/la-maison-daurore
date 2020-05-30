const mongoose = require('mongoose')
const ClassroomSchedule = require('./ClassroomSchedule')

const ClassroomSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  phone: {
    type: String,
    required: false,
    trim: true,
    match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
  },
  seat: {
    type: Number,
    required: false
  }
})

// CREATE A CLASSROOM SCHEDULE MODEL AFTER POST
ClassroomSchema.post('save', async (doc, next) => {
  await ClassroomSchedule.create({ id_classroom: doc._id })
  next()
})

// CASCADE DELETE SCHEDULE WHEN CLASSROOM IS DELETED
ClassroomSchema.post('remove', async (doc, next) => {
  await ClassroomSchedule.deleteMany({ id_classroom: doc._id })
  next()
})

module.exports = mongoose.model('Classroom', ClassroomSchema)
