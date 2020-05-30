const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getSchedules,
  getSchedule,
  createSchedule,
  updateSchedule,
  deleteSchedule
} = require('../controllers/schedules')

const Schedule = require('../models/Schedule')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router({ mergeParams: true })

router
  .route('/')
  .get(protect, advancedResults(Schedule), getSchedules)
  .post(protect, authorize('admin', 'super_admin'), createSchedule)

router
  .route('/:id')
  .get(protect, getSchedule)
  .put(protect, updateSchedule)
  .delete(protect, authorize('admin', 'super_admin'), deleteSchedule)

module.exports = router
