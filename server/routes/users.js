const express = require('express')
const { protect, authorize } = require('../middlewares/auth')
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  uploadPhoto,
  getPhoto
} = require('../controllers/users')

const User = require('../models/User')
const advancedResults = require('../middlewares/advancedResults')

// INCLUDE OTHER RESOURCE ROUTERS
const LoginsRouter = require('./logins')
const SchedulesRouter = require('./schedules')

const router = express.Router()

// RE-ROUTE INTO OTHER RESOURCE ROUTERS
router.use('/:userId/logins', LoginsRouter)
router.use('/:userId/schedules', SchedulesRouter)

router
  .route('/')
  .get(advancedResults(User), protect, getUsers)
  .post(createUser)

router
  .route('/:id')
  .get(protect, getUser)
  .put(protect, updateUser)
  .delete(protect, authorize('admin', 'super_admin'), deleteUser)

router
  .route('/:id/photo')
  .put(protect, uploadPhoto)
  .get(protect, getPhoto)

module.exports = router
