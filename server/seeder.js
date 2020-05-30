const fs = require('fs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// LOAD ENV VARS
dotenv.config({ path: './configs/config.env' })

// LOAD MODELS
const Role = require('./models/Role')
const Day = require('./models/Day')
const Classroom = require('./models/Classroom')
const ClassroomSchedule = require('./models/ClassroomSchedule')
const Login = require('./models/Login')
const User = require('./models/User')

// CONNECT TO DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})

// READ JSON FILES
const roles = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/roles.json`, 'utf-8')
)
const days = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/days.json`, 'utf-8')
)
const classrooms = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/classrooms.json`, 'utf-8')
)
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8')
)
const logins = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/logins.json`, 'utf-8')
)

// IMPORT INTO DB
const importData = async () => {
  try {
    await Role.create(roles)
    await Day.create(days)
    await Classroom.create(classrooms)
    await User.create(users)
    await Login.create(logins)
    console.log('Data Imported...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// DELETE DATA
const deleteData = async () => {
  try {
    await Role.deleteMany()
    await Day.deleteMany()
    await Classroom.deleteMany()
    await ClassroomSchedule.deleteMany()
    await User.deleteMany()
    await Login.deleteMany()
    console.log('Data Destroyed...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// CALL FUNCTION ON TERMINAL
if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
