const User = require('../models/User')
const ClassroomSchedule = require('../models/ClassroomSchedule')
const Day = require('../models/Day')
const Schedule = require('../models/Schedule')

const getSchedules = async (res, datas) => {
  const schedules = await Schedule.create(datas)

  res.status(200).json({
    success: true,
    count: schedules.length,
    data: schedules
  })
}

const generateSchedule = async (res, startDate, endDate, callBack) => {
  const classroomSchedules = await ClassroomSchedule.find().lean()
  const schedule = [] // Declare Array ici
  let secondIndex = 0

  classroomSchedules.forEach(function(classroomSchedule, index) {
    classroomSchedule.id_day.forEach(async idDay => {
      const day = await Day.findById(idDay)
      const childs = await User.find({
        id_classroom: classroomSchedule.id_classroom
      }).lean()
      const dayToIncrement = new Date(startDate)
      const strDayToIncrement = `${dayToIncrement.getFullYear()}/${dayToIncrement.getMonth() +
        1}/${dayToIncrement.getDate()}`
      const differenceInDays =
        (endDate.getTime() - dayToIncrement.getTime()) / (1000 * 3600 * 24)
      let increment = 0
      while (increment <= differenceInDays) {
        const today = new Date(strDayToIncrement)
        today.setDate(today.getDate() + increment)
        if (today.getDay() === day.value) {
          childs.forEach(child => {
            const childJson = {
              id_user: child._id,
              id_classroom: child.id_classroom,
              date: today,
              is_absent: false
            }
            const collabJson = {
              id_user: child.id_collaborater,
              id_classroom: child.id_classroom,
              date: today,
              is_absent: false
            }
            schedule.push(childJson, collabJson)
          })
        }
        increment += 1
      }
      if (index + 1 === classroomSchedules.length) {
        secondIndex += 1
        if (secondIndex === 2) {
          callBack(res, schedule)
        }
      }
    })
  })
}
module.exports = {
  getSchedules,
  generateSchedule
}
