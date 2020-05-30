const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Day = require('../models/Day')

// @desc     Get all days
// @route    GET /days
// @access   Private
exports.getDays = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single day
// @route   GET /days/:id
// @access  Private
exports.getDay = asyncHandler(async (req, res, next) => {
  const day = await Day.findById(req.params.id)

  if (!day) {
    return next(
      new ErrorResponse(`Day not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: day
  })
})

// @desc    Create new day
// @route   POST /days
// @access  Private
exports.createDay = asyncHandler(async (req, res) => {
  const day = await Day.create(req.body)
  res.status(201).json({
    success: true,
    data: day
  })
})

// @desc    Update day
// @route   PUT /days/:id
// @access  Private
exports.updateDay = asyncHandler(async (req, res, next) => {
  const day = await Day.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!day) {
    return next(
      new ErrorResponse(`Day not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: day
  })
})

// @desc    Delete day
// @route   DELETE /days/:id
// @access  Private
exports.deleteDay = asyncHandler(async (req, res, next) => {
  const day = await Day.findByIdAndDelete(req.params.id)

  if (!day) {
    return next(
      new ErrorResponse(`Day not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(204).json()
})
