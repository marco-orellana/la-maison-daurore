const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/async')
const ClassroomSchedule = require('../models/ClassroomSchedule')

// @desc     Get all classroom schedules
// @route    GET /classroom-schedules
// @route    GET /classrooms/:classroomId/classroom-schedules
// @access   Private
exports.getclassroomSchedules = asyncHandler(async (req, res) => {
  if (req.params.classroomId) {
    const classroomSchedules = await ClassroomSchedule.findOne({
      id_classroom: req.params.classroomId
    })
    res.status(200).json({
      success: true,
      data: classroomSchedules
    })
  } else {
    res.status(200).json(res.advancedResults)
  }
})

// @desc    Get single classroom schedule
// @route   GET /classroom-schedules/:id
// @access  Private
exports.getclassroomSchedule = asyncHandler(async (req, res, next) => {
  const classroomSchedule = await ClassroomSchedule.findById(req.params.id)

  if (!classroomSchedule) {
    return next(
      new ErrorResponse(
        `classroomSchedule not found with ID: ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: classroomSchedule
  })
})

// @desc    Update classroom schedule
// @route   PUT /classroom-schedules/:id
// @access  Private
exports.updateclassroomSchedule = asyncHandler(async (req, res, next) => {
  const classroomSchedule = await ClassroomSchedule.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  )

  if (!classroomSchedule) {
    return next(
      new ErrorResponse(
        `classroomSchedule not found with ID: ${req.params.id}`,
        404
      )
    )
  }

  res.status(200).json({
    success: true,
    data: classroomSchedule
  })
})
