const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Classroom = require('../models/Classroom')

// @desc     Get all classrooms
// @route    GET /classrooms
// @access   Private
exports.getClassrooms = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single classroom
// @route   GET /classrooms/:id
// @access  Private
exports.getClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.id)

  if (!classroom) {
    return next(
      new ErrorResponse(`Classroom not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: classroom
  })
})

// @desc    Create new classroom
// @route   POST /classrooms
// @access  Private
exports.createClassroom = asyncHandler(async (req, res) => {
  const classroom = await Classroom.create(req.body)
  res.status(201).json({
    success: true,
    data: classroom
  })
})

// @desc    Update classroom
// @route   PUT /classrooms/:id
// @access  Private
exports.updateClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!classroom) {
    return next(
      new ErrorResponse(`Classroom not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: classroom
  })
})

// @desc    Delete classroom
// @route   DELETE /classrooms/:id
// @access  Private
exports.deleteClassroom = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.id)

  if (!classroom) {
    return next(
      new ErrorResponse(`Classroom not found with ID: ${req.params.id}`, 404)
    )
  }

  classroom.remove()

  res.status(204).json()
})
