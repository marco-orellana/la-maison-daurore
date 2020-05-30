const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const Login = require('../models/Login')

// @desc     Get all logins
// @route    GET /logins
// @route    GET /users/:userId/logins
// @access   Private
exports.getLogins = asyncHandler(async (req, res) => {
  if (req.params.userId) {
    const login = await Login.findOne({
      id_user: req.params.userId
    })
    res.status(200).json({
      success: true,
      data: login
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc     Get single login
// @route    GET /logins/:id
// @access   Private
exports.getLogin = asyncHandler(async (req, res, next) => {
  const login = await Login.findById(req.params.id)

  if (!login) {
    return next(
      new ErrorResponse(`Login not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: login
  })
})

// @desc     Get single login by email
// @route    GET /logins/search/:email
// @access   Public
exports.getLoginByEmail = asyncHandler(async (req, res, next) => {
  const login = await Login.findOne({ email: req.params.email })

  if (!login) {
    return next(
      new ErrorResponse(`Login not found with Email: ${req.params.email}`, 404)
    )
  }

  res.status(200).json({
    success: true
  })
})

// @desc     Create login to user
// @route    POST /logins
// @access   Public
exports.createLogin = asyncHandler(async (req, res) => {
  const { id_user, email, password, is_active } = req.body

  const login = await Login.create({
    id_user,
    email,
    password,
    is_active
  })

  res.status(200).json({
    success: true,
    data: login
  })
})

// @desc     Update login Status
// @route    PUT /logins/:id
// @access   Private
exports.updateLoginStatus = asyncHandler(async (req, res, next) => {
  const { is_active } = req.body

  const login = await Login.findByIdAndUpdate(
    req.params.id,
    { is_active },
    {
      new: true,
      runValidators: true
    }
  )

  if (!login) {
    return next(
      new ErrorResponse(`Login not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: login
  })
})

// @desc    Delete login
// @route   DELETE /logins/:id
// @access  Private
exports.deleteLogin = asyncHandler(async (req, res, next) => {
  const login = await Login.findByIdAndDelete(req.params.id)

  if (!login) {
    return next(
      new ErrorResponse(`Login not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(204).json()
})
