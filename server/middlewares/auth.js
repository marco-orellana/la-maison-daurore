const jwt = require('jsonwebtoken')
const asyncHandler = require('./async')
const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../models/User')
const Role = require('../models/Role')

// PROTECT ROUTES
exports.protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies.token) {
    token = req.cookies.token
  }

  // MAKE SURE TOKEN EXISTS
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }

  try {
    // VERIFY TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded)
    req.user = await User.findById(decoded.id)
    next()
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
})

// GRANT ACCESS TO SPECIFIC ROLES
exports.authorize = (...roles) => {
  return async (req, res, next) => {
    const role = await Role.findById(req.user.id_role)
    if (!roles.includes(role.title)) {
      return next(
        new ErrorResponse(
          `User role ${role.title} is not authorized to access this route`,
          403
        )
      )
    }
    next()
  }
}
