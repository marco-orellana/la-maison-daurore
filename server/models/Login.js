const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const LoginSchema = new mongoose.Schema({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    ref: 'User'
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  is_active: Boolean,
  resetPasswordToken: String,
  resetPasswordExpire: Date
})

// ENCRYPT PASSWORD USING BCRYPT
LoginSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// SIGN JWT AND RETURN
LoginSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this.id_user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  })
}

// MATCH USER ENTERED PASSWORD TO HASHED PASSWORD IN DATABASE
LoginSchema.methods.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

// GENERATE AND HASH PASSWORD TOKEN
LoginSchema.methods.getResetPasswordToken = function() {
  // GENERATE TOKEN
  const resetToken = crypto.randomBytes(20).toString('hex')

  // HASH TOKEN AND SET TO resetPasswordToken FIELD
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex')

  // SET EXPIRE
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000

  return resetToken
}

module.exports = mongoose.model('Login', LoginSchema)
