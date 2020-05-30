const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getclassroomSchedules,
  getclassroomSchedule,
  updateclassroomSchedule
} = require('../controllers/classroomSchedules')

const ClassroomSchedule = require('../models/ClassroomSchedule')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(
    advancedResults(ClassroomSchedule),
    protect,
    authorize('admin', 'super_admin'),
    getclassroomSchedules
  )

router
  .route('/:id')
  .get(protect, getclassroomSchedule)
  .put(protect, authorize('admin', 'super_admin'), updateclassroomSchedule)

module.exports = router
