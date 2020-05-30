const mongoose = require('mongoose')
const Login = require('./Login')

const UserSchema = new mongoose.Schema({
  id_role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true
  },
  id_child: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  id_parent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  id_collaborater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  id_classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom'
  },
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  sex: {
    type: String,
    trim: true,
    enum: ['male', 'female']
  },
  address: {
    type: String,
    trim: true
  },
  birthday: {
    type: Date
  },
  photo: {
    type: String,
    default: 'no-photo.jpg'
  },
  has_child: Boolean,
  is_subscribed: Boolean,
  contact: [
    {
      personal: {
        type: String,
        trim: true,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      },
      home: {
        type: String,
        trim: true,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      },
      work: {
        type: String,
        trim: true,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      },
      emergency: {
        type: String,
        trim: true,
        match: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      }
    }
  ],
  membership: [
    {
      status: {
        type: Boolean
      },
      payement_method: {
        type: String,
        trim: true
      },
      member_card: {
        type: Boolean
      },
      discount_card: {
        type: Boolean
      }
    }
  ],
  expectation: {
    type: String,
    trim: true
  },
  need: {
    type: String,
    trim: true
  },
  involvement: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  comment: {
    type: String,
    trim: true
  },
  experience: {
    type: String,
    trim: true
  },
  motivation: {
    type: String,
    trim: true
  },
  availability: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Day'
    }
  ],
  question: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  interest: [
    {
      question: {
        type: String,
        trim: true
      },
      response: {
        type: String,
        trim: true
      }
    }
  ],
  school_info: [
    {
      name: {
        type: String,
        trim: true
      },
      level: {
        type: String,
        trim: true
      },
      adl: {
        type: Boolean
      },
      redouble: {
        type: String,
        trim: true
      },
      evaluate: {
        type: Boolean
      },
      reason: {
        type: String,
        trim: true
      },
      educator_name: {
        type: String,
        trim: true
      },
      educator_phone: {
        type: String,
        trim: true
      }
    }
  ],
  medical_info: [
    {
      ramq: {
        type: String,
        trim: true
      },
      allergies: {
        type: String,
        trim: true
      },
      drugs: {
        type: String,
        trim: true
      },
      other_info: {
        type: String,
        trim: true
      }
    }
  ],
  authorization: [
    {
      paper: {
        type: Boolean
      },
      internet: {
        type: Boolean
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// CASCADE DELETE LOGIN WHEN USER IS DELETED
UserSchema.post('remove', async (doc, next) => {
  await Login.deleteMany({ id_user: doc._id })
  next()
})

module.exports = mongoose.model('User', UserSchema)
