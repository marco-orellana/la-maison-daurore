const mongoose = require('mongoose')

const EvaluationSchema = new mongoose.Schema({
  id_schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  },
  evaluation: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  question: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ]
})

module.exports = mongoose.model('Evaluation', EvaluationSchema)
