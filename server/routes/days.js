const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getDays,
  getDay,
  createDay,
  updateDay,
  deleteDay
} = require('../controllers/days')

const Day = require('../models/Day')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router()

router
  .route('/')
  .get(advancedResults(Day), getDays)
  .post(protect, authorize('admin', 'super_admin'), createDay)

router
  .route('/:id')
  .get(getDay)
  .put(protect, authorize('admin', 'super_admin'), updateDay)
  .delete(protect, authorize('admin', 'super_admin'), deleteDay)

module.exports = router
