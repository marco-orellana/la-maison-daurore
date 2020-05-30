const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
})

module.exports = mongoose.model('Role', RoleSchema)
