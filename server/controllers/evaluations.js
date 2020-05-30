const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Evaluation = require('../models/Evaluation')

// @desc     Get all evaluations
// @route    GET /evaluations
// @access   Private
exports.getEvaluations = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single evaluation
// @route   GET /evaluations/:id
// @access  Private
exports.getEvaluation = asyncHandler(async (req, res, next) => {
  const evaluation = await Evaluation.findById(req.params.id)

  if (!evaluation) {
    return next(
      new ErrorResponse(`Evaluation not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: evaluation
  })
})

// @desc    Create new evaluation
// @route   POST /evaluations
// @access  Private
exports.createEvaluation = asyncHandler(async (req, res) => {
  const evaluation = await Evaluation.create(req.body)
  res.status(201).json({
    success: true,
    data: evaluation
  })
})

// @desc    Update evaluation
// @route   PUT /evaluations/:id
// @access  Private
exports.updateEvaluation = asyncHandler(async (req, res, next) => {
  const evaluation = await Evaluation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  if (!evaluation) {
    return next(
      new ErrorResponse(`Evaluation not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: evaluation
  })
})

// @desc    Delete evaluation
// @route   DELETE /evaluations/:id
// @access  Private
exports.deleteEvaluation = asyncHandler(async (req, res, next) => {
  const evaluation = await Evaluation.findByIdAndDelete(req.params.id)

  if (!evaluation) {
    return next(
      new ErrorResponse(`Evaluation not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(204).json()
})
