const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const fileupload = require('express-fileupload')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')
const errorHandler = require('./middlewares/error')
const connectDB = require('./configs/db')

const app = express()

// LOAD ENV VARS
dotenv.config({ path: './configs/config.env' })

// ENABLE CORS
app.use(cors({ origin: true, credentials: true }))

// MIDDLEWARES
app.use(express.json())
app.use(cookieParser())
app.use(fileupload())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
app.use(express.static('public'))

// PREVENT HTTP PARAM POLLUTION
app.use(hpp())

// DEV LOGGING MIDDLEWARE
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// ROUTE FILES
const roles = require('./routes/roles')
const classrooms = require('./routes/classrooms')
const days = require('./routes/days')
const classroomSchedules = require('./routes/classroomSchedules')
const auth = require('./routes/auth')
const logins = require('./routes/logins')
const users = require('./routes/users')
const schedules = require('./routes/schedules')
const inconsistencies = require('./routes/inconsistencies')
const evaluations = require('./routes/evaluations')

// MOUNT ROUTERS
app.use('/roles', roles)
app.use('/classrooms', classrooms)
app.use('/days', days)
app.use('/classroom-schedules', classroomSchedules)
app.use('/auth', auth)
app.use('/logins', logins)
app.use('/users', users)
app.use('/schedules', schedules)
app.use('/inconsistencies', inconsistencies)
app.use('/evaluations', evaluations)

// MAIN ROUTE
app.get('/', (req, res) => {
  res.sendFile('index.html')
})

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

// CONNECT TO DATABASE
connectDB()

// CONNECT TO SERVER
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(
    'Server listening on: http://localhost:%s',
    PORT,
    `in ${process.env.NODE_ENV}`
  )
})

// HANDLE UNHANDLED PROMISE REJECTIONS
process.on('unhandledRejection', err => {
  console.log('Error:', err.message)
  // CLOSE SERVER & EXIT PROCESS
  server.close(() => process.exit(1))
})
