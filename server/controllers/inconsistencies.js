const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Inconsistency = require('../models/Inconsistency')

// @desc     Get all Inconsistencies
// @route    GET /inconsistencies
// @access   Private
exports.getInconsistencies = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single inconsistency
// @route   GET /inconsistencies/:id
// @access  Private
exports.getInconsistency = asyncHandler(async (req, res, next) => {
  const inconsistency = await Inconsistency.findById(req.params.id)

  if (!inconsistency) {
    return next(
      new ErrorResponse(
        `inconsistency not found with ID: ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: inconsistency
  })
})

// @desc    Create new inconsistency
// @route   POST /inconsistencies
// @access  Private
exports.createInconsistency = asyncHandler(async (req, res) => {
  const inconsistency = await Inconsistency.create(req.body)
  res.status(201).json({
    success: true,
    data: inconsistency
  })
})

// @desc    Update inconsistency
// @route   PUT /inconsistencies/:id
// @access  Private
exports.updateInconsistency = asyncHandler(async (req, res, next) => {
  const inconsistency = await Inconsistency.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  if (!inconsistency) {
    return next(
      new ErrorResponse(
        `inconsistency not found with ID: ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: inconsistency
  })
})

// @desc    Delete inconsistency
// @route   DELETE /inconsistencies/:id
// @access  Private
exports.deleteInconsistency = asyncHandler(async (req, res, next) => {
  const inconsistency = await Inconsistency.findByIdAndDelete(req.params.id)

  if (!inconsistency) {
    return next(
      new ErrorResponse(
        `inconsistency not found with ID: ${req.params.id}`,
        404
      )
    )
  }

  res.status(204).json()
})
