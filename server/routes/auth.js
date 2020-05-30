const express = require('express')
const { protect } = require('../middlewares/auth')
const {
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
  updatePassword,
  updateEmail
} = require('../controllers/auth')

const router = express.Router()

router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.get('/logout', logout)
router.get('/user', protect, getUser)
router.put('/reset-password/:token', resetPassword)
router.put('/update-password', protect, updatePassword)
router.put('/update-email', protect, updateEmail)

module.exports = router
