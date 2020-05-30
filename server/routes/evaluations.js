const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getEvaluations,
  getEvaluation,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation
} = require('../controllers/evaluations')

const Evaluation = require('../models/Evaluation')
const advancedResults = require('../middlewares/advancedResults')

const router = express.Router()

router
  .route('/')
  .get(
    advancedResults(Evaluation),
    protect,
    authorize('admin', 'super_admin'),
    getEvaluations
  )
  .post(protect, createEvaluation)

router
  .route('/:id')
  .get(protect, authorize('admin', 'super_admin'), getEvaluation)
  .put(protect, authorize('admin', 'super_admin'), updateEvaluation)
  .delete(protect, authorize('admin', 'super_admin'), deleteEvaluation)

module.exports = router
