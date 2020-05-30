const crypto = require('crypto')
const ErrorResponse = require('../utils/ErrorResponse')
const sendEmail = require('../utils/sendEmail')
const asyncHandler = require('../middlewares/async')
const Login = require('../models/Login')
const User = require('../models/User')

// GET TOKEN FROM MODEL, CREATE COOKIE AND SEND RESPONSE
const sendTokenResponse = (login, statusCode, res) => {
  // CREATE TOKEN
  const token = login.getSignedJwtToken()

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  if (process.env.NODE_ENV === 'production') {
    options.secure = true
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ success: true, token })
}

// @desc     Login user
// @route    POST /auth/login
// @access   public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  // VALIDATE EMAIL & PASSWORD
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }

  // CHECK FOR USER
  const login = await Login.findOne({ email }).select('+password')

  if (!login) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  // CHECK IF PASSWORD MATCHES
  const isMatch = await login.matchPassword(password)

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401))
  }

  // CHECK IF USER LOGIN IS ACTIVATED
  if (!login.is_active) {
    return next(new ErrorResponse('User not activated', 401))
  }

  sendTokenResponse(login, 200, res)
})

// @desc     Get current logged in user
// @route    GET /auth/user
// @access   Private
exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id)

  res.status(200).json({
    success: true,
    data: user
  })
})

// @desc     Log user out / Clear cookie
// @route    GET /auth/logout
// @access   Private
exports.logout = asyncHandler(async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    data: {}
  })
})

// @desc     Forgot password
// @route    POST /auth/forgot-password
// @access   Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const login = await Login.findOne({ email: req.body.email })

  if (!login) {
    return next(new ErrorResponse('There is no user with that email', 404))
  }

  // GET RESET TOKEN
  const resetToken = login.getResetPasswordToken()

  await login.save({ validateBeforeSave: false })

  // CREATE RESET URL
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/auth/reset-password/${resetToken}`

  const message = `You are receiving this email because you (or someone else)
   has requested the reset of a password.
   Please make a PUT request to: \n\n ${resetUrl}`

  try {
    await sendEmail({
      email: login.email,
      subject: 'Password reset token',
      message
    })

    res.status(200).json({
      success: true,
      data: 'Email sent'
    })
  } catch (err) {
    console.log(err)
    login.ResetPasswordToken = undefined
    login.resetPasswordExpire = undefined

    await login.save({ validateBeforeSave: false })

    return next(new ErrorResponse('Email could not be sent', 500))
  }
})

// @desc     Reset Password
// @route    PUT /auth/reset-password/:token
// @access   Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // GET HASHED TOKEN
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex')

  const login = await Login.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  })

  if (!login) {
    return next(new ErrorResponse('Invalid token', 400))
  }

  // SET NEW PASSWORD
  login.password = req.body.password
  login.resetPasswordToken = undefined
  login.resetPasswordExpire = undefined

  await login.save()

  res.status(200).json({
    success: true,
    data: login
  })
})

// @desc     Update Password
// @route    PUT /auth/update-password
// @access   Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const login = await Login.findOne({ id_user: req.user.id }).select(
    '+password'
  )

  // CHECK CURRENT PASSWORD
  if (!(await login.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401))
  }

  login.password = req.body.newPassword
  await login.save()

  sendTokenResponse(login, 200, res)
})

// @desc     Update Email
// @route    PUT /auth/update-email
// @access   Private
exports.updateEmail = asyncHandler(async (req, res, next) => {
  const login = await Login.findOne({ id_user: req.user.id }).select(
    '+password'
  )

  // CHECK CURRENT PASSWORD
  if (!(await login.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401))
  }

  login.email = req.body.newEmail
  await login.save()

  sendTokenResponse(login, 200, res)
})
