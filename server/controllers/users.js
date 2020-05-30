const path = require('path')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const { uploadToS3, getS3Photo } = require('../utils/awsBucket')
const User = require('../models/User')

// @desc     Get all users
// @route    GET /users
// @access   Private
exports.getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(res.advancedResults)
})

// @desc    Get single user
// @route   GET /user/:id
// @access  Private
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: user
  })
})

// @desc    Create new user
// @route   POST /users
// @access  Public
exports.createUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({
    success: true,
    data: user
  })
})

// @desc    Update user
// @route   PUT /users/:id
// @access  Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    )
  }

  res.status(200).json({
    success: true,
    data: user
  })
})

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    )
  }

  user.remove()

  res.status(204).json()
})

// @desc    Upload photo for user
// @route   PUT /users/:id/photo
// @access  Private
exports.uploadPhoto = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    )
  }

  if (!req.files) {
    return next(new ErrorResponse('Please upload a file', 400))
  }

  const file = req.files.file

  // MAKE SURE THE IMAGE IS A PHOTO
  if (!file.mimetype.startsWith('image')) {
    return next(new ErrorResponse('Please upload an image file', 400))
  }

  // CHECK FILESIZE
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    )
  }

  // CREATE CUSTOM FILENAME
  file.name = `photo-${user._id}${path.parse(file.name).ext}`

  // CALL AWS S3 METHOD
  uploadToS3(req, res, next, file)
})

// @desc    Get photo for user
// @route   GET /users/:id/photo
// @access  Private
exports.getPhoto = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)

  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.params.id}`, 404)
    )
  }

  const fileName = user.photo

  if (fileName.includes('no-photo')) {
    let url
    if (user.sex === 'male') {
      url = `${req.protocol}://${req.hostname}/uploads/no-photo-male.png`
      res.status(200).json({
        success: true,
        data: url
      })
    } else {
      url = `${req.protocol}://${req.hostname}/uploads/no-photo-female.png`
      res.status(200).json({
        success: true,
        data: url
      })
    }
  } else {
    // CALL AWS S3 METHOD
    getS3Photo(res, next, fileName)
  }
})
