const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Role = require('../models/Role')

// @desc     Get all roles
// @route    GET /roles
// @access   Private
exports.getRoles = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single role
// @route   GET /routes/:id
// @access  Private
exports.getRole = asyncHandler(async (req, res, next) => {
  const role = await Role.findById(req.params.id)

  if (!role) {
    return next(
      new ErrorResponse(`Role not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: role
  })
})

// @desc    Create new role
// @route   POST /routes
// @access  Private
exports.createRole = asyncHandler(async (req, res) => {
  const role = await Role.create(req.body)
  res.status(201).json({
    success: true,
    data: role
  })
})

// @desc    Update role
// @route   PUT /routes/:id
// @access  Private
exports.updateRole = asyncHandler(async (req, res, next) => {
  const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!role) {
    return next(
      new ErrorResponse(`Role not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: role
  })
})

// @desc    Delete role
// @route   DELETE /routes/:id
// @access  Private
exports.deleteRole = asyncHandler(async (req, res, next) => {
  const role = await Role.findByIdAndDelete(req.params.id)

  if (!role) {
    return next(
      new ErrorResponse(`Role not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(204).json()
})
