const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getInconsistencies,
  getInconsistency,
  createInconsistency,
  updateInconsistency,
  deleteInconsistency
} = require('../controllers/inconsistencies')

const Inconsistency = require('../models/Inconsistency')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router()

router
  .route('/')
  .get(
    advancedResults(Inconsistency),
    protect,
    authorize('admin', 'super_admin'),
    getInconsistencies
  )
  .post(protect, authorize('admin', 'super_admin'), createInconsistency)

router
  .route('/:id')
  .get(protect, authorize('admin', 'super_admin'), getInconsistency)
  .put(protect, authorize('admin', 'super_admin'), updateInconsistency)
  .delete(protect, authorize('admin', 'super_admin'), deleteInconsistency)

module.exports = router
